import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
import "../styles/Feed.css";
import Story from "../components/Story";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import Search from "./Search";
// import Login from "./Login";
// import Signup from "./Signup";

const projectId = "f104bi07c490";

function Feed({ toggleDarkMode, darkMode, token }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  // const [token, setToken] = useState(localStorage.getItem("token"));

  // useEffect(() => {
  //   if (!token) {
  //     localStorage.removeItem("token");
  //   }
  // }, [token]);

  const fetchPosts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post?limit=10&page=${page}`,
        {
          headers: {
            projectID: projectId,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching the api");
      }
      const data = await response.json();
      console.log("vaib");
      console.log(data.data);
      console.log(posts.length);
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

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage < posts.length &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  const handleSearch = (query) => {
    if (!query) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className={darkMode ? "feed dark-mode" : "feed"}>
      <Story />
      <CreatePost />
      <Search onSearch={handleSearch} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        filteredPosts
          // .slice(page * 10 - 10, page * 10)
          .map((post) => <Post key={post._id} post={post} token={token} />)
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
