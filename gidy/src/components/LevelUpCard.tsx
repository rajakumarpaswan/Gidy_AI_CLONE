import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { IconPlus } from "@tabler/icons-react";
import "./LevelCard.css";

/* ---------- TYPES ---------- */

interface CertificationType {
  certification: string;
  provider: string;
  certificate_url?: string;
  certificate_id?: string;
  issued_date?: string;
  expiry_date?: string;
  description?: string;
}

interface MissingStatus {
  skills: boolean;
  experience: boolean;
  education: boolean;
  certifications: boolean;
}

interface FormDataType {
  certification: string;
  provider: string;
  certificate_url: string;
  certificate_id: string;
  issued_date: string;
  expiry_date: string;
  description: string;
}

const LevelUpCard: React.FC = () => {

  const email: string | null = localStorage.getItem("email");

  const [certifications, setCertifications] = useState<CertificationType[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const [missing, setMissing] = useState<MissingStatus>({
    skills: false,
    experience: false,
    education: false,
    certifications: false
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataType>({
    certification: "",
    provider: "",
    certificate_url: "",
    certificate_id: "",
    issued_date: "",
    expiry_date: "",
    description: ""
  });

  /* ---------- FETCH CERTIFICATIONS ---------- */

  const fetchCertifications = async () => {

    try {

      const res = await axios.get<CertificationType[]>(
        "http://localhost:5000/certifications/",
        { params: { email } }
      );

      setCertifications(res.data);

    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    calculateProfileProgress();
    fetchCertifications();
  }, []);

  /* ---------- PROFILE PROGRESS ---------- */

  const calculateProfileProgress = async () => {

    try {

      const [skills, experience, education, certs] = await Promise.all([

        axios.get<any[]>("http://localhost:5000/skills", { params: { email } }),
        axios.get<any[]>("http://localhost:5000/experience", { params: { email } }),
        axios.get<any[]>("http://localhost:5000/education", { params: { email } }),
        axios.get<any[]>("http://localhost:5000/certifications", { params: { email } })

      ]);

      let score = 0;

      const status: MissingStatus = {
        skills: false,
        experience: false,
        education: false,
        certifications: false
      };

      if (skills.data.length > 0) {
        score += 20;
      } else {
        status.skills = true;
      }

      if (experience.data.length > 0) {
        score += 20;
      } else {
        status.experience = true;
      }

      if (education.data.length > 0) {
        score += 20;
      } else {
        status.education = true;
      }

      if (certs.data.length > 0) {
        score += 20;
      } else {
        status.certifications = true;
      }

      // profile info always present
      score += 20;

      setProgress(score);
      setMissing(status);

    } catch (error) {
      console.error(error);
    }

  };

  /* ---------- PROGRESS COLOR ---------- */

  const getColor = (): string => {

    if (progress === 100) return "#22c55e";
    if (progress >= 60) return "#f59e0b";

    return "#ef4444";

  };

  /* ---------- FORM HANDLERS ---------- */

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  /* ---------- ADD CERTIFICATION ---------- */

  const handleSubmit = async () => {

    try {

      await axios.post(
        "http://localhost:5000/certifications/add",
        {
          email,
          ...formData
        }
      );

      setShowModal(false);

      fetchCertifications();
      calculateProfileProgress();

    } catch (error) {
      console.error(error);
    }

  };

  return (

    <div className="level-up-profile">

      <div className="title-container">

        <p className="title">🎓 Level Up Profile</p>

        <p className="muted">
          Just a few clicks away from awesomeness, complete your profile!
        </p>

      </div>

      {/* PROGRESS BAR */}

      <div className="progress-bar">

        <p className="progress-text">Progress {progress}%</p>

        <div className="range-bar">

          <input
            type="range"
            value={progress}
            max="100"
            readOnly
            style={{ accentColor: getColor() }}
          />

        </div>

      </div>

      <div className="add-icon" onClick={() => setShowModal(true)}>
        <IconPlus />
      </div>

      {/* CERTIFICATIONS */}

      {certifications.length === 0 ? (

        <div className="upload-certificates">

          <div className="certificate">

            <p className="upload-certificate">
              Upload Your Certificates 📜 <span className="green">(+20%)</span>
            </p>

            <p className="muted-boost">
              Boost your profile with relevant certifications and training.
            </p>

          </div>

          <div className="add-icon" onClick={() => setShowModal(true)}>
            <IconPlus />
          </div>

        </div>

      ) : (

        <div className="certification-list">

          {certifications.map((cert, index) => (

            <div className="cert-card" key={index}>

              <h4>{cert.certification}</h4>

              <p>{cert.provider}</p>

              <p>
                {cert.issued_date}
                {cert.expiry_date && ` - ${cert.expiry_date}`}
              </p>

              {cert.certificate_url && (
                <a href={cert.certificate_url} target="_blank">
                  View Certificate
                </a>
              )}

            </div>

          ))}

        </div>

      )}

      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>Add Certification</h3>

            <input
              name="certification"
              placeholder="Certification *"
              onChange={handleChange}
            />

            <input
              name="provider"
              placeholder="Provider *"
              onChange={handleChange}
            />

            <input
              name="certificate_url"
              placeholder="Certificate URL"
              onChange={handleChange}
            />

            <input
              name="certificate_id"
              placeholder="Certificate ID"
              onChange={handleChange}
            />

            <label>Issued Date</label>

            <input
              type="date"
              name="issued_date"
              onChange={handleChange}
            />

            <label>Expiry Date</label>

            <input
              type="date"
              name="expiry_date"
              onChange={handleChange}
            />

            <textarea
              name="description"
              maxLength={200}
              placeholder="Description (200 characters)"
              onChange={handleChange}
            />

            <div className="modal-buttons">

              <button onClick={handleSubmit}>
                Save
              </button>

              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
};

export default LevelUpCard;