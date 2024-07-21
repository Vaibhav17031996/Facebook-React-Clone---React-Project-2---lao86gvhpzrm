import { Avatar } from "@mui/material";
import React from "react";
import "../styles/SidebarLeft.css";

function SidebarOptions({ src, title, Icon }) {
  return (
    <div className="sidebar-left">
      {src && <Avatar className="user-img" src={src} />}
      {Icon && <Icon />}
      <p>{title}</p>
    </div>
  );
}

export default SidebarOptions;
