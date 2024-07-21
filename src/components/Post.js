import React, { useState, useEffect } from "react";
// import {Avatar,IconButton,Card,CardHeader,CardContent,CardActions,Typography,TextField,Button} from "@mui/material";
// import { FavoriteIcon, CommentIcon, ShareIcon } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
// import { useAuth } from "../context/AuthContext";
import "../styles/Post.css";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjRjN2U5ZWJmY2ZiM2YyYmYwMTQ0NCIsImlhdCI6MTcxMzY4NjUwNSwiZXhwIjoxNzQ1MjIyNTA1fQ.IO2-UKaz1CASUB62DSwh2_uoIVRgBp7HINE_cr63siE";
const projectId = "f104bi07c490";

function Post({ post, token }) {
  // const { user } = useAuth();
  const [likes, setLikes] = useState(post.likeCount);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    // if (!user) {
    //   alert("Please log in to like the post.");
    //   return;
    // }
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
      // console.log(response); // Stringified json
      // console.log(response.data); // Array of comments
      const data = await response.json();
      console.log("Patwal");
      // console.log(data); // json
      console.log(data.data); // Array of comments
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
            // Authorization: `Bearer ${token}`,
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

  /* 
    useEffect(() => {
      if (showComments) {
        fetchComments();
      }
    }, [showComments]); 
  */

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
        {/* <button className={liked ? "liked" : "not-liked"} onClick={handleLike}>
          Likes: {likes}
        </button>
        <button
          className="post-btn"
          onClick={() => {
            fetchComments(post._id);
          }}
        >
          Comments
        </button> */}
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

    // {/* <Card>
    //   <CardHeader
    //     avatar={<Avatar>{post.author.profileImage}</Avatar>}
    //     title={post.author.name}
    //     subheader={new Date(post.createdAt).toLocaleString()}
    //   />
    //   <CardContent>
    //     {post.images.length ? (
    //       <img
    //         src={post.images[0]}
    //         alt="Post"
    //         style={{ width: "100%", height: "auto" }}
    //       />
    //     ) : null}
    //     <Typography variant="body2" color="textSecondary" component="p">
    //       {post.content}
    //     </Typography>
    //   </CardContent>
    //   <CardActions disableSpacing>
    //     <IconButton onClick={handleLike} color={liked ? "primary" : "default"}>
    //       <Favorite />
    //     </IconButton>
    //     <IconButton
    //       onClick={() => {
    //         fetchComments(post._id);
    //       }}
    //     >
    //       <Comment />
    //     </IconButton>
    //     <IconButton>
    //       <Share />
    //     </IconButton>
    //   </CardActions>
    //   {showComments && (
    //     <CardContent>
    //       {comments.map((comment) => (
    //         <Typography
    //           key={comment._id}
    //           variant="body2"
    //           color="textSecondary"
    //           component="p"
    //         >
    //           {comment.content}
    //         </Typography>
    //       ))}
    //       {user && (
    //         <div>
    //           <TextField
    //             value={newComment}
    //             onChange={(e) => setNewComment(e.target.value)}
    //             label="Add a comment"
    //             fullWidth
    //           />
    //           <Button onClick={handleAddComment}>Add comment</Button>
    //         </div>
    //       )}
    //     </CardContent>
    //   )}
    // </Card> */}
  );
}

export default Post;
