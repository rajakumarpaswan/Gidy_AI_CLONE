import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { IconPlus, IconSchool } from "@tabler/icons-react";
import { Timeline, Text } from "@mantine/core";

/* ----------- TYPES ----------- */

interface EducationType {
  id: number;
  college: string;
  degree: string;
  field: string;
  location: string;
  start_date: string;
  end_date: string;
  currently_studying: boolean;
}

interface FormDataType {
  college: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

/* ----------- COMPONENT ----------- */

const Education: React.FC = () => {

  const [educations, setEducations] = useState<EducationType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataType>({
    college: "",
    degree: "",
    field: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false
  });

  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {

      const res = await axios.get<EducationType[]>(
        "http://localhost:5000/education/",
        { params: { email } }
      );

      setEducations(res.data);

    } catch (error) {
      console.error("Error fetching education:", error);
    }
  };

  /* -------- DATE FORMAT -------- */

  const formatDate = (date: string | null) => {
    if (!date) return "Present";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  /* -------- HANDLE INPUT -------- */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {

      setFormData({
        ...formData,
        current: checked,
        endDate: checked ? "" : formData.endDate
      });

    } else {

      setFormData({
        ...formData,
        [name]: value
      });

    }
  };

  /* -------- ADD EDUCATION -------- */

  const handleAddEducation = async () => {

    try {

      await axios.post(
        "http://localhost:5000/education/add-education",
        {
          email,
          ...formData
        }
      );

      setShowModal(false);
      fetchEducation();

    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  return (

    <div className="education-card">

      {/* HEADER */}

      <div className="section-header">

        <h2>Education</h2>

        <div
          className="plus-circle small"
          onClick={() => setShowModal(true)}
        >
          <IconPlus />
        </div>

      </div>


      {/* TIMELINE */}

      <Timeline bulletSize={28} lineWidth={2}  active={educations.length - 1} >

        {educations.length === 0 ? (

          <Text size="sm" c="dimmed">
            No education added
          </Text>

        ) : (

          educations.map((edu) => (

            <Timeline.Item
              key={edu.id}
              bullet={<IconSchool size={14} />}
              title={edu.degree}
            >

              <Text size="sm" fw={500}>
                {edu.college} • {edu.location}
              </Text>

              <Text size="xs" c="dimmed">
                {formatDate(edu.start_date)} -{" "}
                {edu.currently_studying
                  ? "Present"
                  : formatDate(edu.end_date)}
              </Text>

              <Text size="xs" c="dimmed">
                {edu.field}
              </Text>

            </Timeline.Item>

          ))

        )}

      </Timeline>


      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>Add Education</h3>

            <input
              name="college"
              placeholder="College"
              onChange={handleChange}
            />

            <input
              name="degree"
              placeholder="Degree"
              onChange={handleChange}
            />

            <input
              name="field"
              placeholder="Field of Study"
              onChange={handleChange}
            />

            <input
              name="location"
              placeholder="Location"
              onChange={handleChange}
            />

            <label>Date of Joining</label>

            <input
              type="date"
              name="startDate"
              onChange={handleChange}
            />

            <label>Date of Completion</label>

            <input
              type="date"
              name="endDate"
              disabled={formData.current}
              onChange={handleChange}
            />

            <label>

              <input
                type="checkbox"
                name="current"
                checked={formData.current}
                onChange={handleChange}
              />

              Currently studying here

            </label>

            <div className="modal-buttons">

              <button style={{backgroundColor:"white", color:"black", borderRadius:"5px", padding:"4px 6px"}} onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button style={{backgroundColor:"black", color:"white", borderRadius:"5px", padding:"4px 6px"}}  onClick={handleAddEducation}>
                Add
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Education;