import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import "../styles/ProfilePage.css";

const projectId = "f104bi07c490";

const ProfilePage = ({ toggleDarkMode, darkMode }) => {
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  // const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) {
      fetch(
        `https://academics.newtonschool.co/api/v1/facebook/user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: projectId,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setProfile(data.data));
    }
  }, [user]);

  if (!profile) {
    return <Typography>There is no profile to show</Typography>;
  }

  return (
    <Container className={darkMode ? "dark-mode" : ""}>
      <Typography variant="h4">Profile</Typography>
      <br />
      <Typography variant="h6">Name: {profile.name}</Typography>
      <Typography variant="h6">Email: {profile.email}</Typography>
    </Container>
  );
};

export default ProfilePage;
