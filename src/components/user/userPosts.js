import { useEffect, useState } from "react";
import "./userPosts.css";
import { useNavigate } from "react-router-dom";
import handle from "../posts/helpers/handle";
import Header from "../header/header";

export default function Posts({ userId, token }) {
  const navigate = useNavigate();
  let url;
  if (userId !== undefined) {
    url = `http://localhost:5000/posts/${userId}`;
  } else {
    url = "http://localhost:5000/posts/owner";
  }
  let data;
  const [posts, setPosts] = useState([]);

  // handling the comments from a post
  function commentsHandler(post_id) {
    navigate(`/comments/${post_id}` + `/${token}`);
  }

  // likeshandler that shows the people that liked a particular post
  function likeshandler(post_id) {
    navigate(`/likes/${post_id}` + `/${token}`);
  }

  // handling liking of posts
  function likeHandler(post_id) {
    (async () => {
      await handle.like(post_id, token);
      fetchData();
    })();
  }

  // handles post deletion from the app
  function deletePost(post_id) {
    (async () => {
      await handle.delete(post_id, token);
      fetchData();
    })();
  }

  // function used to fetch posts from the api
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          token,
        },
      });
      data = await response.json();
      if (data.status !== undefined) {
        setPosts(data.status);
      }
    } catch (err) {}
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  const imagesUrl = "http://localhost:5000/uploads/";
  // if loaded load the products from the db
  return (
    <>
      <Header caller="user" token={token} />
      <div className="userpostsContainer">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="dataplusx">
              <div className="picAndData">
                <img
                  alt="image of owner"
                  className="rounded-image"
                  src={`${imagesUrl}${post.owner.picture}`}
                ></img>
                <div>{post.owner.name}</div>
              </div>
              {post.own && (
                <div className="alter-class">
                  <div
                    className="alt-word"
                    onClick={() => navigate(`/editPost/${post.id}/${token}`)}
                  >
                    Edit
                  </div>
                  <img
                    src={require(`./assets/delete.png`)}
                    className="delete-logo"
                    onClick={() => deletePost(post.id)}
                  ></img>
                </div>
              )}
            </div>
            <div className="background-text-color">{post.content}</div>
            <div className="picturesContainer">
              {post.pictures.map((picture) => (
                <div key={picture} className="picture">
                  <img alt="post image" src={`${imagesUrl}${picture}`}></img>
                </div>
              ))}
            </div>
            <div className="inlineContent">
              <div className="picAndData">
                <img
                  className="logo-image"
                  alt=""
                  src={require(`./assets/like-button.png`)}
                  onClick={() => likeHandler(post.id)}
                ></img>
                {/**
               * <img className='logo-eye' alt='' src={require(`./assets/view-likes.png`)}
                onClick={() => likeshandler(post.id)}
              ></img>
               */}
                <div>{post.likes.length}</div>
              </div>
              <div className="picAndData">
                <img
                  className="logo-image"
                  alt=""
                  src={require(`./assets/comments-logo.png`)}
                  onClick={() => commentsHandler(post.id)}
                ></img>
                <div>{post.comments.length}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
