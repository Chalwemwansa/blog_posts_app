// the comments component that is used to show the comments in a post

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handle from "./helpers/helper";
import "./comments.css";
import Back from "../back/back";

const Comment = () => {
  const token = useParams().token;
  const navigate = useNavigate();
  const imagesUrl = "http://localhost:5000/uploads/";
  const [comments, setComments] = useState([]);
  const [comment, setcomment] = useState("");
  const postId = useParams().postId;
  const url = `http://localhost:5000/post/${postId}`;

  // function that posts a comment and clears the textField
  function handleComment() {
    (async () => {
      await handle.comment(postId, comment, token);
      fetchData();
    })();
    setcomment("");
  }

  // function that fetches data from the database
  const fetchData = async () => {
    try {
      await fetch(url, {
        method: "GET",
        headers: {
          token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setComments(data.status.comments);
        });
    } catch {}
  };

  useEffect(() => {
    fetchData();
  }, [comments]);

  return (
    <>
      <Back page={"comments"} />
      <div className="main-container">
        <div className="container">
          <div className="comments-container">
            {comments.map((comment, index) => (
              <div className="comment-container" key={index}>
                <div className="owner">
                  {comment.picture !== undefined ? (
                    <img
                      className="owner-logo"
                      src={`${imagesUrl}${comment.picture}`}
                      onClick={() => navigate(`/user/${comment.id}/${token}`)}
                    ></img>
                  ) : (
                    <img
                      className="owner-logo"
                      src={require("./assets/user.png")}
                      onClick={() => navigate(`/user/${comment.id}/${token}`)}
                    ></img>
                  )}
                  <div className="owner-name">{comment.name}</div>
                </div>
                <div className="comment">{comment.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="comment-section-wrapper">
        <div className="comment-section">
          <textarea
            className="comment-text-area"
            id="comment"
            placeholder="add a comment"
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
          ></textarea>
          <img
            className="logo-image"
            alt=""
            src={require(`./assets/send-button.png`)}
            onClick={handleComment}
          ></img>
        </div>
      </div>
    </>
  );
};

export default Comment;
