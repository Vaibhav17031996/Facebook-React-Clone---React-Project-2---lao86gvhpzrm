import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import "../styles/Post.css";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjRjN2U5ZWJmY2ZiM2YyYmYwMTQ0NCIsImlhdCI6MTcxMzY4NjUwNSwiZXhwIjoxNzQ1MjIyNTA1fQ.IO2-UKaz1CASUB62DSwh2_uoIVRgBp7HINE_cr63siE";
const projectId = "f104bi07c490";

function Post({ post, token }) {
  const [likes, setLikes] = useState(post.likeCount);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/like/${post._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: projectId,
          },
        }
      );
      if (liked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.log("Error liking post: ", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post/${post._id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: projectId,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data.data);
      setShowComments(!showComments);
    } catch (error) {
      console.log("Error fetching comments: ", error);
    }
  };

  const handleAddComment = async (post) => {
    if (!token) {
      alert("Please log in to comment.");
      return;
    }
    console.log(post._id);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${post._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: projectId,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: newComment }),
        }
      );
      const data = await response.json();
      console.log("Vaibhav");
      console.log(data.data);
      setComments([...comments, data.data]);

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: projectId,
          },
        }
      );
      setComments(comments.filter((comment) => comment._id !== id));
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <div className="post-card">
      <div className="post-card-header">
        <img
          className="post-img"
          src={post.author.profileImage}
          alt={post.author.name.charAt(0)}
        />
        <h4>{post.author.name}</h4>
        <p>{new Date(post.createdAt).toLocaleString()}</p>
      </div>

      <div className="post-card-content">
        {post.images.length ? <img src={post.images[0]} alt="Post" /> : null}
        <h5>{post.content}</h5>
      </div>

      <div className="post-interactions">
        <FavoriteIcon
          onClick={handleLike}
          sx={{ color: liked ? "red" : "grey" }}
        />
        <CommentIcon
          onClick={() => {
            fetchComments(post._id);
          }}
        />
        <ShareIcon />
      </div>
      {showComments && (
        <div className="comments-section">
          <div className="add-comment">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={() => handleAddComment(post)}>Comment</button>
            {/* <p>{comments}</p> */}
          </div>
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p>{comment.content}</p>
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
