// component that is used to edit a post

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./editPost.css";
import Header from "../header/header";

const EditPost = () => {
  const postId = useParams().postId;
  const token = useParams().token;
  // url for editing and getting a post
  const url = `http://localhost:5000/post/${postId}`;
  const imageUrl = "http://localhost:5000/uploads/";

  const [type, settype] = useState("");
  const [pictures, setpictures] = useState([]);
  const [content, setcontent] = useState("");
  const [id, setId] = useState("");

  async function fetchData() {
    await fetch(url, {
      method: "GET",
      headers: {
        token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        settype(data.status.type);
        setpictures(data.status.pictures);
        setcontent(data.status.content);
        setId(data.status.id);
      });
  }

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  function handle(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    (async () => {
      await fetch(url, {
        method: "PUT",
        headers: {
          token,
        },
        body: formData,
      });
      await fetchData();
    })();
  }

  function handlePic(imageUrl) {
    const imgUrl = `http://localhost:5000/post/${id}/${imageUrl}`;
    (async () => {
      await fetch(imgUrl, {
        method: "DELETE",
        headers: {
          token,
        },
      });
      await fetchData();
    })();
  }

  return (
    <>
      <Header token={token} />
      <div className="edit-container">
        <form onSubmit={handle} className="editform">
          <div className="editportion">
            <label>Type</label>
            <input
              type="text"
              name="type"
              id="type"
              value={type}
              className="edit-input-section"
              onChange={(e) => settype(e.target.value)}
            ></input>
          </div>
          <div className="editportion">
            <label>Content</label>
            <textarea
              id="content"
              name="content"
              className="edit-input-section"
              value={content}
              onChange={(e) => setcontent(e.target.value)}
            ></textarea>
          </div>
          <div className="editportion">
            <label>Add pictures</label>
            <input
              type="file"
              id="pictures"
              name="pictures"
              multiple
              className="edit-input-section myimg"
            ></input>
          </div>
          <button className="edit-sub" type="submit">
            Edit
          </button>
        </form>
        <div className="editimages">
          {pictures.map((picture, index) => (
            <div key={index} className="edit-image-container">
              <img
                className="editdelete"
                src={require("./assets/delete.png")}
                onClick={() => handlePic(picture)}
              ></img>
              <img className="editpic-p" src={`${imageUrl}${picture}`}></img>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EditPost;
