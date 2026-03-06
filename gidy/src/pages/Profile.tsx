import Navbar from "../components/Navbar"
import ProfileInfo from "../components/ProfileInfo"
import '../App.css'
import LevelUpCard from "../components/LevelUpCard"
import SkillsCard from "../components/SkillsCard"
import Experience from "../components/Experience"
import Education from "../components/Education"
import GoalsCard from "../components/GoalsCard"


const Profile = () => {
  return (
    <div>
        <Navbar/>
        <div className="profile-card-container">
            <ProfileInfo/>
            <GoalsCard/>
            <div className="Cards-grid-section">
              <div className="left">
                 <LevelUpCard/>
            <SkillsCard/>
              </div>
              <div className="rigth">
                 <Experience/>
            <Education/>
              </div>
            </div>
           
           
        </div>
    </div>
  )
}

export default Profile