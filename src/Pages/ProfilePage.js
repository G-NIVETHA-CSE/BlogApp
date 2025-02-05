import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    dob: "",
    experience: "",
    description: "",
    specialization: "",
    awards: "",
    photo: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const loggedInUsername = "user123"; 
  const [age, setAge] = useState(null);

  
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`https://blogappbackend-tsas.onrender.com/profile/${loggedInUsername}`);
      if (response.ok) {
        const profileData = await response.json();
        setProfile(profileData);
      } else {
        console.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [loggedInUsername]);

  useEffect(() => {
    if (profile.dob) {
      const birthDate = new Date(profile.dob);
      const today = new Date();
      const ageInMilliseconds = today - birthDate;
      const ageDate = new Date(ageInMilliseconds);
      setAge(Math.abs(ageDate.getUTCFullYear() - 1970));
    }
  }, [profile.dob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setProfile((prevProfile) => ({
        ...prevProfile,
        photo: photoURL,
      }));
    }
  };

  const handleSaveProfile = async () => {
    setError("");
    const response = await fetch(`https://blogappbackend-tsas.onrender.com/profile/${loggedInUsername}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    if (response.ok) {
      alert("Profile saved!");
      setIsEditing(false); 
    } else {
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="profile-page">
      <header className="header3">
        <nav className="nav-bar">
          <Link to="/home" className="nav-link">🏠 Home</Link>
          <Link to="/posts" className="nav-link">📝 My Blogs</Link>
          <Link to="/createpost" className="nav-link">📢 Create Blog</Link>
          <Link to="/profile" className="nav-link">👤 Profile</Link>
        </nav>
      </header>

      <h1>Profile</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="profile-photo-container">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          id="profile-photo-upload"
          style={{ display: "none" }} 
        />
        <label htmlFor="profile-photo-upload" className="upload-label">
          Upload Photo 📸
        </label>
        {profile.photo && <img src={profile.photo} alt="Profile" className="profile-img" />}
      </div>

      <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
        {isEditing ? "Cancel Edit ❌" : "Edit Profile ✏️"}
      </button>

      <div className="profile-info">
        <div className="profile-field">
          <label htmlFor="name">Full Name 📝</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            title="Full Name"
          />
        </div>

        <div className="profile-field">
          <label htmlFor="dob">Date of Birth 🎂</label>
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            disabled={!isEditing}
            title="Date of Birth"
          />
          {profile.dob && age && <p>Age: {age} 🎉</p>}
        </div>

        <div className="profile-field">
          <label htmlFor="experience">Years of Experience 💼</label>
          <input
            type="number"
            name="experience"
            placeholder="Enter years of experience"
            value={profile.experience}
            onChange={handleChange}
            disabled={!isEditing}
            title="Experience"
          />
        </div>

        <div className="profile-field">
          <label htmlFor="description">Description ✨</label>
          <textarea
            name="description"
            placeholder="Describe yourself"
            value={profile.description}
            onChange={handleChange}
            disabled={!isEditing}
            title="Description"
          />
        </div>

        <div className="profile-field">
          <label htmlFor="specialization">Specialization 🎯</label>
          <input
            type="text"
            name="specialization"
            placeholder="Enter your specialization"
            value={profile.specialization}
            onChange={handleChange}
            disabled={!isEditing}
            title="Specialization"
          />
        </div>

        <div className="profile-field">
          <label htmlFor="awards">Awards 🏆</label>
          <input
            type="text"
            name="awards"
            placeholder="Enter your awards"
            value={profile.awards}
            onChange={handleChange}
            disabled={!isEditing}
            title="Awards"
          />
        </div>
      </div>

      <div className="social-links">
        <h2>Social Media Links 🌐</h2>
        
        <div className="profile-field">
          <label htmlFor="facebook">Facebook 📘</label>
          <input
            type="url"
            name="facebook"
            placeholder="Facebook URL"
            value={profile.socialLinks.facebook}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                socialLinks: { ...prevProfile.socialLinks, facebook: e.target.value },
              }))
            }
            disabled={!isEditing}
            title="Facebook URL"
          />
        </div>
        
        <div className="profile-field">
          <label htmlFor="twitter">Twitter 🐦</label>
          <input
            type="url"
            name="twitter"
            placeholder="Twitter URL"
            value={profile.socialLinks.twitter}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                socialLinks: { ...prevProfile.socialLinks, twitter: e.target.value },
              }))
            }
            disabled={!isEditing}
            title="Twitter URL"
          />
        </div>
        
        <div className="profile-field">
          <label htmlFor="instagram">Instagram 📸</label>
          <input
            type="url"
            name="instagram"
            placeholder="Instagram URL"
            value={profile.socialLinks.instagram}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                socialLinks: { ...prevProfile.socialLinks, instagram: e.target.value },
              }))
            }
            disabled={!isEditing}
            title="Instagram URL"
          />
        </div>
        
        <div className="profile-field">
          <label htmlFor="linkedin">LinkedIn 🔗</label>
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={profile.socialLinks.linkedin}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                socialLinks: { ...prevProfile.socialLinks, linkedin: e.target.value },
              }))
            }
            disabled={!isEditing}
            title="LinkedIn URL"
          />
        </div>
      </div>

      {isEditing && (
        <button className="save-button" onClick={handleSaveProfile}>
          Save Profile 💾
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
