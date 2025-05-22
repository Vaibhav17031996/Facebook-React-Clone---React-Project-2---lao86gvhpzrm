import React, { useState, useEffect } from "react";
import "../styles/Feed.css";
import Story from "../components/Story";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import Search from "./Search";

const projectId = "f104bi07c490";

function Feed({ toggleDarkMode, darkMode, token }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post?limit=10&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: projectId,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching the api");
      }
      const data = await response.json();
      // setPosts((prevPosts) => [...prevPosts, ...data.data]);
      setPosts(data.data);
      setFilteredPosts(data.data); // Initialize filteredPosts with all posts
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const addNewPost = (newPost) => {
    // setPosts([newPost, ...posts]); // Add new post to the top
    setPosts((prevPosts) => [newPost, ...prevPosts]); // New post appears on top
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: "f104bi07c490",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
  
      // ✅ Remove the post from UI after deletion
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage < posts.length &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  const handleSearch = (value) => {
    if (!value) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.content.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className={darkMode ? "feed dark-mode" : "feed"}>
      <Story />
      <CreatePost
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        addNewPost={addNewPost}
      />
      <Search
        onSearch={handleSearch}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            token={token}
            toggleDarkMode={toggleDarkMode}
            deletePost = {deletePost}
          />
        ))
      )}

      {posts.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination_disabled"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀️
          </span>
          {[...Array(posts.length)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination_selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < posts.length ? "" : "pagination_disabled"}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}

export default Feed;
