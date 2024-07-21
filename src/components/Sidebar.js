import React from "react";
import SidebarOptions from "./SidebarOptions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupsIcon from "@mui/icons-material/Groups";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FeedIcon from "@mui/icons-material/Feed";
import AssistantIcon from "@mui/icons-material/Assistant";
import "../styles/Sidebar.css";
import { useAuth } from "../context/AuthContext";

function Sidebar({ toggleDarkMode, darkMode }) {
  const { user } = useAuth();
  console.log(user.name);
  return (
    <div className={darkMode ? "sidebar dark-mode" : "sidebar"}>
      <SidebarOptions
        src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
        title={user.name}
      />
      <SidebarOptions Icon={Diversity3Icon} title="Friends" />
      <SidebarOptions Icon={AccessTimeIcon} title="Memories" />
      <SidebarOptions Icon={BookmarkIcon} title="Saved" />
      <SidebarOptions Icon={GroupsIcon} title="Groups" />
      <SidebarOptions Icon={OndemandVideoIcon} title="Video" />
      <SidebarOptions Icon={StorefrontIcon} title="Marketplace" />
      <SidebarOptions Icon={FeedIcon} title="Feeds" />
      <SidebarOptions Icon={AssistantIcon} title="Events" />
      <SidebarOptions Icon={KeyboardArrowDownIcon} title="See more" />
    </div>
  );
}

export default Sidebar;
