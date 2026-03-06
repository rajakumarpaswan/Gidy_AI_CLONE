import { IconDownload, IconEdit, IconMail } from "@tabler/icons-react";
import "./ProfileInfo.css";
import React, { useEffect, useState } from "react";
import axios from "axios";


interface Profile {
  name: string;
  education: string;
  location: string;
  bio: string;
  email: string;
  profile_pic?: string; 
}

const ProfileInfo : React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editedProfile, setEditedProfile] = useState<Profile | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      const response = await axios.get("http://localhost:5000/profile/", {
        params: {
          name: user.name,
          email: user.email,
        },
      });

      setProfile(response.data);

      localStorage.setItem("user", JSON.stringify(response.data));

    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  fetchProfile();
}, []);


const handleEditClick = () => {
  if (profile) {
    setEditedProfile(profile);
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  }
};



const handleSave = async () => {
  if (!editedProfile) return;

  try {
    const formData = new FormData();

    formData.append("name", editedProfile.name);
    formData.append("education", editedProfile.education);
    formData.append("location", editedProfile.location);
    formData.append("bio", editedProfile.bio);
    formData.append("email", editedProfile.email);

    if (selectedImage) {
      formData.append("profilePic", selectedImage);
    }

    const response = await axios.put(
      "http://localhost:5000/profile/update-profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setProfile(response.data.user);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    setIsModalOpen(false);
    setSelectedImage(null);

  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update profile");
  }
};

  return (
    <div className="profile-info-card">
      <div className="profile-information">
        <div className="profile-header">
          <div
  className="avatar"
  style={{
    backgroundImage: `url(${profile?.profile_pic || "https://i.pravatar.cc/150"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
></div>
    <div className="username-info">
              <div className="username-box">
                <p className="username">
                  {profile?.name}
                  <span className="education">
                    {" "}
                    ( {profile?.education} )
                  </span>
                </p>
                <p className="location">{profile?.location}</p>
              </div>

              <div className="dots-container">
                <div
                  className="dots"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  ⋮
                </div>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <p onClick={handleEditClick}>Edit Profile</p>
                    <p>Settings</p>
                    <p>Share Profile</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        <div className="profile-bio">
          <div className="profile-bio-info">
            <div className="profile-bio-main">
             <p className="profile-bio-text">{profile?.bio}</p>
            </div>
          </div>
          <div className="profile-bio-info-2">
            <div className="links">
                <div className="gmail">
                   <span className="mail-icon"> <IconMail /></span> <p className="gmail-id">{profile?.email}</p>
                </div>
                <div className="download-btn">
                  <div className="button">
                    <span><IconDownload /> </span><p>Download Resume</p>
                  </div>
                </div>
            </div>
            <div className="rewards">
                <div className="rewardname">
               <div className="medal">
                🥉
               </div>
               <div className="categories">
                 <p className="reward-title">League</p>
              <p className="reward-detail">Bronze</p>
               </div>
               <div className="categories">
                 <p className="reward-title">Rank</p>
              <p className="reward-detail">33</p>
               </div>
               <div className="categories">
                 <p className="reward-title">Points</p>
              <p className="reward-detail">50</p>
               </div>
                </div>
                <div className="view-rewards">
                           <div className="view-all-rewards">
                            <p>View My Rewards →</p>
                           </div>
                </div>
            </div>

          </div>
        </div>
      </div>
        {/* ================= MODAL ================= */}
      {isModalOpen && editedProfile && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Profile</h2>

           <div className="photo">
  <div className="profile-picture">
    <img
      src={
        selectedImage
          ? URL.createObjectURL(selectedImage)
          : editedProfile.profile_pic  || "https://i.pravatar.cc/150"
      }
      alt="Profile"
    />
  </div>

  <label htmlFor="profileUpload" className="edit-icon">
    <IconEdit />
  </label>

  <input
    type="file"
    id="profileUpload"
    accept="image/*"
    style={{ display: "none" }}
    onChange={(e) => {
      if (e.target.files) {
        setSelectedImage(e.target.files[0]);
      }
    }}
  />
</div>
          

          <div className="profile-name">
                <div className="lable-name"><span> Name</span></div>
                   <input
              type="text"
              value={editedProfile.name}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  name: e.target.value,
                })
              }
              placeholder="Name"
            />
            </div>
             <div className="profile-name">
                <div className="lable-name"><span>education</span></div>
           <input
              type="text"
              value={editedProfile.education}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  education: e.target.value,
                })
              }
              placeholder="Education"
            />
            </div>

            <div className="profile-name">
                <div className="lable-name"><span>location</span></div>
           <input
              type="text"
              value={editedProfile.location}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  location: e.target.value,
                })
              }
              placeholder="Location"
            />
           
            </div>

                <div className="profile-name">
                <div className="lable-name"><span>Bio</span></div>
          <textarea
              value={editedProfile.bio}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  bio: e.target.value,
                })
              }
              placeholder="Bio"
            />
           
            </div>

            

           

           

           

            <div className="modal-buttons">
              <button onClick={handleSave}>Update</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default ProfileInfo;
