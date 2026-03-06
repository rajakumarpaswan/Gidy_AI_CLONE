import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { IconPlus, IconBriefcase } from "@tabler/icons-react";
import { Timeline, Text } from "@mantine/core";

/* ---------- TYPES ---------- */

interface ExperienceType {
  id: number;
  designation: string;
  company_name: string;
  location: string;
  start_date: string;
  end_date: string | null;
}

interface FormDataType {
  designation: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
}

/* ---------- COMPONENT ---------- */

const Experience: React.FC = () => {

  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataType>({
    designation: "",
    company: "",
    location: "",
    startDate: "",
    endDate: ""
  });

  const formatDate = (date: string | null) => {
  if (!date) return "Present";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {

      const res = await axios.get<ExperienceType[]>(
        "http://localhost:5000/experience/",
        {
          params: { email }
        }
      );

      setExperiences(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleAddExperience = async () => {

    try {

      await axios.post(
        "http://localhost:5000/experience/add-experience",
        {
          email,
          ...formData
        }
      );

      setShowModal(false);

      setFormData({
        designation: "",
        company: "",
        location: "",
        startDate: "",
        endDate: ""
      });

      fetchExperiences();

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="experience-card">

      {/* Header */}
      <div className="section-header">

        <h2>Experience</h2>

        <div
          className="plus-circle small"
          onClick={() => setShowModal(true)}
        >
          <IconPlus />
        </div>

      </div>

      {/* Timeline */}

      <Timeline bulletSize={28} lineWidth={2} active={experiences.length - 1} >

        {experiences.map((exp) => (

          <Timeline.Item
            key={exp.id}
            bullet={<IconBriefcase size={14} />}
            title={exp.designation}
          >

            <Text size="sm" fw={500}>
              {exp.company_name} • {exp.location}
            </Text>

          <Text size="xs" c="dimmed">
  {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
</Text>

          </Timeline.Item>

        ))}

      </Timeline>

      {/* Modal */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>Add Experience</h3>

            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />

            <div className="modal-buttons">

              <button style={{backgroundColor:"white", color:"black", borderRadius:"5px", padding:"4px 6px"}} onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button style={{backgroundColor:"black", color:"white", borderRadius:"5px", padding:"4px 6px"}} onClick={handleAddExperience}>
                Add
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Experience;