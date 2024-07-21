import React, { useState, useRef } from "react";
import "../styles/CreatePost.css";
import { Avatar, IconButton, Modal } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAuth } from "../context/AuthContext";

function CreatePost() {
  const { user } = useAuth();
  console.log(user);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const fileInputRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleFileChange = (e) => {
  //   setMedia(e.target.files[0]);
  // };
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
    // Handle the selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("content", content);
    if (media) {
      formData.append("media", media);
    }

    // Send the post data to the server
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/facebook/post",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
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

  return (
    <>
      {/* Modal is coming from material UI */}
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
              <IconButton>
                <input
                  type="file"
                  accept="image/*,video/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <PhotoLibraryIcon
                  fontSize="large"
                  style={{ color: "green" }}
                  onClick={handleIconClick}
                />
                <EmojiEmotionsIcon
                  fontSize="large"
                  style={{ color: "#ffb100" }}
                />
                <MoreHorizIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
          <input
            type="submit"
            className="post-submit"
            value="Post"
            onClick={handleSubmit}
          />
        </div>
      </Modal>
      <div className="create-post">
        <div className="create-post-top">
          <Avatar />
          <form>
            <input
              type="text"
              placeholder="What's on your mind, Vaibhav?"
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
            <PhotoLibraryIcon style={{ color: "green" }} fontSize="large" />
            <p>Photo/Video</p>
          </div>
          <div className="create-post-options">
            <EmojiEmotionsIcon style={{ color: "#ffb100" }} fontSize="large" />
            <p>Feeling/activity</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
