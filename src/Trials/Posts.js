import React, { useState, useEffect } from "react";
import "../styles/Posts.css";
import Post from "../components/Post";
import Search from "./Search";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjRjN2U5ZWJmY2ZiM2YyYmYwMTQ0NCIsImlhdCI6MTcxMzY4NjUwNSwiZXhwIjoxNzQ1MjIyNTA1fQ.IO2-UKaz1CASUB62DSwh2_uoIVRgBp7HINE_cr63siE";
const projectId = "f104bi07c490";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState({});
  // const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    if (loading) return; // Prevent multiple fetches at the same time
    setLoading(true);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post?limit=10&page=${page}${
          searchQuery ? `&search={"content": "${searchQuery}"}` : ""
        }`,
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
      // console.log(data.data);
      if (data.data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data.data]);
      } else {
        setHasMore(false); // No more posts to load
      }
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page, searchQuery]);

  const loadMorePosts = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= posts.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop + 1 >=
  //     document.documentElement.offsetHeight
  //     // document.documentElement.scrollHeight
  //   ) {
  //     loadMorePosts();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [loading, hasMore]);

  const handleSearch = (query) => {
    setPage(1);
    setPosts([]);
    setSearchQuery(query);
  };

  const createSearchQuery = (query) => {
    if (!query) return "";
    const searchParams = {};

    if (query.content) searchParams.content = query.content;
    if (query.title) searchParams.title = query.title;
    if (query.author) searchParams.author = query.author;

    return `&search=${encodeURIComponent(JSON.stringify(searchParams))}`;
  };

  return (
    <div className="posts-container">
      <div className="header">
        <Search onSearch={handleSearch} />
      </div>
      <div id="post-container">
        {posts.slice(page * 10 - 10, page * 10).map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      {posts.length > 0 && (
        <div className="pagination">
          <span
            className={page >= 1 ? "" : "pagination_disabled"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀️
          </span>
          {[...Array(posts.length / 10)].map((_, i) => {
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
            className={page < posts.length / 10 ? "" : "pagination_disabled"}
          >
            ▶️
          </span>
        </div>
      )}
      {/* {loading && <div className="loading">Loading...</div>} */}
      <div className="load-more-container">
        <button
          className="load-more-btn"
          onClick={loadMorePosts}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}

export default Posts;
