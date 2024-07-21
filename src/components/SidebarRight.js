import React from "react";
import "../styles/SidebarRight.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import Forward5Icon from "@mui/icons-material/Forward5";
import CampaignIcon from "@mui/icons-material/Campaign";

function SidebarRight({ toggleDarkMode, darkMode }) {
  return (
    <div className={darkMode ? "sidebar-right dark-mode" : "sidebar-right"}>
      <div className="sidebar-right-top">
        <div className="sidebar-right-text">
          <h4>Your Pages and profiles</h4>
        </div>
        <MoreHorizIcon />
      </div>
      <div className="sidebar-right-body">
        <div className="sidebar-right-body-options">
          <Avatar src="https://scontent.fblr20-3.fna.fbcdn.net/v/t39.30808-1/300381029_378610344429017_3021393850337803453_n.jpg?stp=cp0_dst-jpg_p50x50&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xKrM7m_lRdkQ7kNvgHzqsX2&_nc_ht=scontent.fblr20-3.fna&oh=00_AYC3P4UBVniYqmvFO90d5_ewq4jyVTNoesZrb-xW_Y0Bgw&oe=664D2F8E" />
          <h4>Indian Premier League</h4>
        </div>
        <div className="sidebar-right-body-options ml">
          <Forward5Icon />
          <p>Switch to Page</p>
        </div>
        <div className="sidebar-right-body-options ml">
          <CampaignIcon />
          <p>Create promotion</p>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default SidebarRight;
