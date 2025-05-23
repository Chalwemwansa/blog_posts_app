// the component responsiblle for uploading a post to the api
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/header";
import "./post.css";

const Post = () => {
  const navigate = useNavigate();
  const url = "http://localhost:5000/post";
  const token = useParams().token;

  async function postData(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    await fetch(url, {
      method: "POST",
      headers: {
        token,
      },
      body: formData,
    });
    navigate("/posts" + `/${token}`);
  }

  return (
    <>
      <Header caller={"post"} token={token} />
      <div className="main-post-container">
        <div className="p-name">
          <h3 className="p-text">Make a post</h3>
        </div>
        <form onSubmit={postData} className="post-form">
          <div className="post-form-section">
            <label className="postLabel">Type</label>
            <input
              id="type"
              type="text"
              className="postInput"
              name="type"
            ></input>
          </div>
          <div className="post-form-section">
            <label className="postLabel">Choose images</label>
            <input
              type="file"
              id="pictures"
              className="imageInput"
              name="pictures"
              multiple
            ></input>
          </div>
          <div className="post-form-section">
            <label className="postLabel">Content</label>
            <textarea
              type="text"
              id="content"
              name="content"
              className="postInput myText"
            ></textarea>
          </div>
          <button type="submit" className="button-class">
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
