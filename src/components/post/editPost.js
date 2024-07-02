// component that is used to edit a post

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const postId = useParams().postId;
  const token = localStorage.getItem('token');
  // url for editing and getting a post
  const url = `http://localhost:5000/post/${postId}`;
  const imageUrl = 'http://localhost:5000/uploads/';

  const [ type, settype ] = useState('');
  const [pictures, setpictures] = useState([]);
  const [ content, setcontent ] = useState('');
  const [ id, setId ] = useState('');

  async function fetchData () {
    await fetch(url, {
      method: 'GET',
      headers: {
        token,
      }
    })
    .then(response => response.json())
    .then(data => {
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
  }, [])

  function handle (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    (async () => {
      await fetch(url, {
        method: 'PUT',
        headers: {
          token,
        },
        body: formData,
      });
      await fetchData();
    })();
  }

  function handlePic (imageUrl) {
    const imgUrl =  `http://localhost:5000/post/${id}/${imageUrl}`

    console.log('here');
    (async () => {
      await fetch (imgUrl, {
        method: 'DELETE',
        headers: {
          token,
        }
      });
      await fetchData();
    })();
  }

  return (
    <div>
      <form onSubmit={handle}>
        <div>
          <label>type</label>
          <input type='text' name='type' id='type' value={type}
            onChange={(e) => settype(e.target.value)}
          ></input>
        </div>
        <div>
          <label>content</label>
          <textarea id='content' name='content'
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>add pictures</label>
          <input type='file' id='pictures' name='pictures' multiple></input>
        </div>
        <button type='submit'>Edit</button>
      </form>
      <div>
        {pictures.map((picture, index) => (
          <div key={index}>
            <img src={require('./assets/delete.png')}
              onClick={() => handlePic(picture)}
            ></img>
            <img src={`${imageUrl}${picture}`}></img>
          </div>
        ))}
      </div>
    </div>
  )
};

export default EditPost;