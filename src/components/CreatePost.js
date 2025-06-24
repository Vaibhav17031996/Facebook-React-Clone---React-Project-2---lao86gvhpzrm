import React, { useState, useRef } from "react";
import "../styles/CreatePost.css";
import { Avatar, IconButton, Modal } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAuth } from "../context/AuthContext";

function CreatePost({ darkMode, addNewPost }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const fileInputRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    if (media) {
      formData.append("media", media);
    }

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/facebook/post",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: "f104bi07c490",
          },
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert("Post created successfully");
        setContent("");
        setMedia(null);
        handleClose();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  /* const handlePostSubmit = async () => {
    if (!content.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/facebook/post/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: "f104bi07c490",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: content }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        addNewPost(data.data); // Update the parent component with the new post
        setContent("");
      } else {
        alert("Failed to create post!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }; */

  return (
    <div className={darkMode ? "createpost dark-mode" : "createpost"}>
      <Modal open={open} onClose={handleClose}>
        <div className="modal-popup">
          <div className="modal-heading">
            <h3>Create post</h3>
            <IconButton>
              <CloseIcon onClick={handleClose} />
            </IconButton>
          </div>
          <div className="modal-header">
            <Avatar />
            <h4>{user.name}</h4>
          </div>
          <div className="modal-body">
            <textarea
              rows="5"
              placeholder={`What's on your mind, ${user.name}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-footer">
            <div className="modal-footer-left">
              <h4>Add to your post</h4>
            </div>
            <div className="modal-footer-right">
              <input
                type="file"
                accept="image/*,video/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <PhotoLibraryIcon
                className="modal-footer-right-photo-icon"
                fontSize="large"
                style={{ color: "green" }}
                onClick={handleIconClick}
              />
              <EmojiEmotionsIcon
                className="modal-footer-right-emoji-icon"
                fontSize="large"
                style={{ color: "#ffb100" }}
              />
              <MoreHorizIcon fontSize="large" />
            </div>
          </div>
          <button
            type="submit"
            className="post-submit"
            value="Post"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </Modal>
      <div className="create-post">
        <div className="create-post-top">
          <Avatar />
          <form>
            <input
              type="text"
              placeholder={`What's on your mind, ${user?.name || "guest"}?`}
              onClick={handleOpen}
            />
          </form>
        </div>
        <div className="create-post-bottom">
          <div className="create-post-options">
            <VideoCallIcon style={{ color: "red" }} fontSize="large" />
            <p>Live Video</p>
          </div>
          <div className="create-post-options">
            <input
              type="file"
              accept="image/*,video/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <PhotoLibraryIcon
              style={{ color: "green" }}
              fontSize="large"
              onClick={handleIconClick}
            />
            <p>Photo/Video</p>
          </div>
          <div className="create-post-options">
            <EmojiEmotionsIcon style={{ color: "#ffb100" }} fontSize="large" />
            <p>Feeling/activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
