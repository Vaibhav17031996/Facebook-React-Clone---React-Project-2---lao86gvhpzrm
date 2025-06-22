import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";
import MessageIcon from "@mui/icons-material/Message";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Search, AccountCircle } from "@mui/icons-material";

import "../styles/Navbar.css";
import ProfilePage from "../pages/ProfilePage";

function Navbar({ toggleDarkMode, darkMode, token }) {
  const { user, logout } = useAuth();
  // const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // event.currentTarget is the HTML element (usually a dropdown icon or button or avatar) that opens the menu.
    // console.log(anchorEl);
    // console.log(event);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleProfilePage = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleToggleDarkModeAndCloseMenu = () => {
    handleMenuClose();
    toggleDarkMode();
  };

  return (
    <div className={darkMode ? "navbar dark-mode" : "navbar"}>
      <div className="navbar-left">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png"
          onClick={() => alert("Facebook logo clicked!")}
        />
        <div className="navbar-search">
          <SearchIcon />
          <input type="text" placeholder="Search Facbook" />
        </div>
      </div>

      <div className="navbar-mid">
        <div className="navbar-option navbar-option-active">
          <HomeIcon
            fontSize="large"
            onClick={() => alert("Home icon clicked!")}
          />
        </div>
        <div className="navbar-option">
          <OndemandVideoIcon
            fontSize="large"
            onClick={() => alert("Video icon clicked!")}
          />
        </div>
        <div className="navbar-option">
          <StorefrontIcon
            fontSize="large"
            onClick={() => alert("Store icon clicked!")}
          />
        </div>
        <div className="navbar-option">
          <GroupsIcon
            fontSize="large"
            onClick={() => alert("Groups icon clicked!")}
          />
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-right-option">
          <Avatar src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg" />
        </div>
        <div className="navbar-right-option">
          <MessageIcon />
        </div>
        <div className="navbar-right-option">
          <CircleNotificationsIcon />
        </div>
        <div className="navbar-right-option">
          <ArrowDropDownCircleIcon onClick={handleMenuOpen} />
        </div>
        {token ? (
          <>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfilePage}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem onClick={handleToggleDarkModeAndCloseMenu}>
                Toggle Dark Mode
              </MenuItem>
            </Menu>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar;
