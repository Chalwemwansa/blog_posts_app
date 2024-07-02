// the component responsiblle for uploading a post to the api
import { useNavigate } from "react-router-dom";
import Header from "../header/header";


const Post = () => {
  const navigate = useNavigate();
  const url = 'http://localhost:5000/post';
  const token = localStorage.getItem('token');

  async function postData (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    //const pictureArray = document.querySelector('input[type="file"]');
    //for (const picture of pictureArray.files) {
    //  formData.append('pictures', picture);
    //}
    await fetch(url, {
      method: 'POST',
      headers: {
        token
      },
      body: formData
    }).then(response => {
      console.log(response);
    });
    navigate('/posts');
  };

  return (
    <>
      <Header caller={'post'}/>
      <form onSubmit={postData}>
        <div>
          <label className="postLabel">type</label>
          <input id='type' type='text' className="postInput" name="type"></input>
        </div>
        <div>
          <label className="postLabel">choose images</label>
          <input type='file' id='pictures' className="postInput" name="pictures" multiple></input>
        </div>
        <div>
          <label className="postLabel">Content</label>
          <textarea type='text' id='content' name="content" className="postInput" ></textarea>
        </div>
        <button type='submit' className="button-class">Post</button>
      </form>
    </>
  )

};

export default Post;