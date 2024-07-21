import React, { useState, useEffect } from "react";
// import { fetchPosts } from "./Feed";
// Function to format timestamps
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const Post = ({ post, token, projectId }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjRjN2U5ZWJmY2ZiM2YyYmYwMTQ0NCIsImlhdCI6MTcxMzY4NjUwNSwiZXhwIjoxNzQ1MjIyNTA1fQ.IO2-UKaz1CASUB62DSwh2_uoIVRgBp7HINE_cr63siE";
  // const projectId = "f104bi07c490";

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post/${post.id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: projectId,
          },
        }
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleLike = async () => {
    try {
      await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/like/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: projectId,
          },
          method: "POST",
        }
      );

      setLikes(post1.like + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: projectId,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ content: newComment }),
        }
      );
      const newCommentData = await response.json();
      setComments([...comments, newCommentData]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: projectId,
          },
          method: "DELETE",
        }
      );
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <h3>{post.author}</h3>
        <p>{formatTimestamp(post.timestamp)}</p>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <div className="post-actions">
        <button onClick={handleLike}>Like ({likes})</button>
        <button onClick={() => setShowComments(!showComments)}>
          Comments ({comments.length})
        </button>
        <button>Share</button>
      </div>
      {showComments && (
        <div className="post-comments">
          <div className="comment-input">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handleAddComment}>Comment</button>
          </div>
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p>
                  <strong>{comment.author}:</strong> {comment.content}
                </p>
                <button onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

//Aparna

const post1 = fetchPosts(1);
const mypost = post1.filter((myPost) => {
  myPost._id === post1.id;
});
const likePost = async (postId) => {
  try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/like/${postId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: projectId,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
      )
    );
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

export default Post;

/* 
  function Post() {
    const [liked, setLiked] = useState(false);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjRjN2U5ZWJmY2ZiM2YyYmYwMTQ0NCIsImlhdCI6MTcxMzY4NjUwNSwiZXhwIjoxNzQ1MjIyNTA1fQ.IO2-UKaz1CASUB62DSwh2_uoIVRgBp7HINE_cr63siE";
    const projectID = "f104bi07c490";

    const likePost = async (liked) => {
      if (!liked) {
        try {
          const response = await fetch(
            "https://academics.newtonschool.co/api/v1/facebook/like/:postId",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                projectID: projectID,
              },
            }
          );
        } catch (error) {
          console.error("Error liking the post: ", error);
        }
      }
      setLiked(true);
    };
    return (
      <>
        <button onClick={likePost}>Like</button>
      </>
    );
  } 
*/

/* 
import React, { useState, useEffect } from "react";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likeCount);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjRjN2U5ZWJmY2ZiM2YyYmYwMTQ0NCIsImlhdCI6MTcxMzY4NjUwNSwiZXhwIjoxNzQ1MjIyNTA1fQ.IO2-UKaz1CASUB62DSwh2_uoIVRgBp7HINE_cr63siE";
  const projectId = "f104bi07c490";

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post/${post.id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: projectId,
          },
        }
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const createComment = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: projectId,
          },
          method: "POST",
          body: JSON.stringify({ content: newComment }),
        }
      );
      const newCommentData = await response.json();
      setComments([...comments, newCommentData]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: projectId,
          },
          method: "DELETE",
        }
      );
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <h3>{post.author}</h3>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <div className="post-actions">
        <button onClick={handleLike(post._id)}>Like ({likes})</button>
        <button onClick={() => setShowComments(!showComments)}>
          Comments ({comments.length})
        </button>
        <button>Share</button>
      </div>
      {showComments && (
        <div className="post-comments">
          <div className="comment-input">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={createComment}>Comment</button>
          </div>
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p>
                  <strong>{comment.author}:</strong> {comment.content}
                </p>
                <button onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

/* 
  function Post() {
    const [liked, setLiked] = useState(false);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjRjN2U5ZWJmY2ZiM2YyYmYwMTQ0NCIsImlhdCI6MTcxMzY4NjUwNSwiZXhwIjoxNzQ1MjIyNTA1fQ.IO2-UKaz1CASUB62DSwh2_uoIVRgBp7HINE_cr63siE";
    const projectID = "f104bi07c490";

    const likePost = async (liked) => {
      if (!liked) {
        try {
          const response = await fetch(
            "https://academics.newtonschool.co/api/v1/facebook/like/:postId",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                projectID: projectID,
              },
            }
          );
        } catch (error) {
          console.error("Error liking the post: ", error);
        }
      }
      setLiked(true);
    };
    return (
      <>
        <button onClick={likePost}>Like</button>
      </>
    );
  } 
*/
