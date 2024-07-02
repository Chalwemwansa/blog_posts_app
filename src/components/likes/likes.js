// contains the Likes component that shows the likes in the page

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Likes = () => {
  const postId = useParams().postId;
  const token = localStorage.getItem('token');
  const imagesUrl = 'http://localhost:5000/uploads/';
  const url = `http://localhost:5000/post/${postId}`
  const [ likes, setLikes ] = useState([]);

  const fetchData = async () => {
    try {
      await fetch(url, {
        method: 'GET',
        headers: {
          token,
        }
      })
      .then(response => response.json())
      .then(data => {
        setLikes(data.status.likes);
      });
    } catch {
      await fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  }, [likes]);

  return (
    <>
      <div className="likes-class">
        {likes.map((like, index) => (
          <div className="like-class" key={index}>
            <img className='owner-logo'src={`${imagesUrl}${like.picture}`}></img>
            <div className="owner-name">{like.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Likes;