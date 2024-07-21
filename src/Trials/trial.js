const [posts, setPosts] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
useEffect(() => {
  fetchPosts(page);
}, [page]);
const fetchPosts = async (page) => {
  setLoading(true);
  try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/post?limit=10&page=${page}`,
      {
        headers: {
          projectID: projectID,
        },
      }
    );
    const data = await response.json();
    setPosts((prevPosts) => [...prevPosts, ...data.data]);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  setLoading(false);
};
const loadMorePosts = () => {
  setPage((prevPage) => prevPage + 1);
};
return (
  <div className="App">
    <div id="posts-container">
      {" "}
      {/* component 1 */}
      {posts.map((post) => (
        <div key={post._id} className="post">
          <h3>{post.author.name}</h3>
          <p>{post.content}</p>
          {post.images.length ? <img src={post.images[0]} alt="Post" /> : null}
          <p>
            Likes: {post.likeCount} | Comments: {post.commentCount}
          </p>
        </div>
      ))}
    </div>
    <div id="load-more" className="load-more" onClick={loadMorePosts}>
      {" "}
      {/*  component 1 */}
      {loading ? "Loading..." : "Load More"}
    </div>
  </div>
);

/*

  import React, { useState, useEffect } from "react";
  import Post from "./Post"; // Import the Post component

  const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = "YOUR_JWT_TOKEN";
    const projectId = "YOUR_PROJECT_ID";

    useEffect(() => {
      fetchPosts();
    }, []);

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://academics.newtonschool.co/api/v1/facebook/post?limit=100",
          {
            headers: {
              projectID: projectId,
            },
          }
        );
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="home">
        {posts.map((post) => (
          <Post key={post.id} post={post} token={token} projectId={projectId} />
        ))}
      </div>
    );
  };

  export default Home;
*/