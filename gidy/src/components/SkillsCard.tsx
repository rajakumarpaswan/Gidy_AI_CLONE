import { useState, useEffect, ChangeEvent } from "react";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import "./SkillsCard.css";

/* ---------- TYPES ---------- */

interface Skill {
  skill_name: string;
}

const SkillsCard: React.FC = () => {

  const [skills, setSkills] = useState<Skill[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [skillInput, setSkillInput] = useState<string>("");

  const email: string | null = localStorage.getItem("email");

  /* ---------- FETCH SKILLS ---------- */

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {

    try {

      const res = await axios.get<Skill[]>(
        "http://localhost:5000/skills",
        {
          params: { email }
        }
      );

      setSkills(res.data);

    } catch (error) {
      console.error(error);
    }

  };

  /* ---------- ADD SKILL ---------- */

  const handleAddSkill = async () => {

    try {

      await axios.post(
        "http://localhost:5000/add-skill",
        {
          email,
          skill: skillInput
        }
      );

      setSkillInput("");
      setShowModal(false);

      fetchSkills(); // refresh list

    } catch (error) {
      console.error(error);
    }

  };

  /* ---------- INPUT CHANGE ---------- */

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  return (

    <div className="skill-card">

      {/* HEADER */}

      <div className="section-header">

        <h2>Skills</h2>

        <div
          className="plus-circle small"
          onClick={() => setShowModal(true)}
        >
          <IconPlus />
        </div>

      </div>

      {/* SKILLS LIST */}

      <div className="skills">

        {skills.length === 0 ? (

          <p>No skills added. Click + to add.</p>

        ) : (

          skills.map((skill, index) => (

            <span key={index} className="skill-name">
              {skill.skill_name}
            </span>

          ))

        )}

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>Add Skill</h3>

            <input
              type="text"
              placeholder="Enter skill"
              value={skillInput}
              onChange={handleInputChange}
            />

            <div className="modal-buttons">

              <button style={{backgroundColor:"white", color:"black", borderRadius:"5px", padding:"4px 6px"}} onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button style={{backgroundColor:"black", color:"white", borderRadius:"5px", padding:"4px 6px"}} onClick={handleAddSkill}>
                Add
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default SkillsCard;