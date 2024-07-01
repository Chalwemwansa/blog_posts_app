// the posts component that shows all the posts that are in the api
import { useEffect, useState } from "react";
import './posts.css';

export default function Posts() {
  const token = localStorage.getItem('token');
  const url = 'http://localhost:5000/posts';
  let data;
  const [ posts, setPosts ] = useState([]);
  const [ error, setError ] = useState(false);
  // function used to fetch posts from the api
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          token,
        }
      })
      data = await response.json();
      console.log(data)
      if (data.status === undefined) {
        setError(true);
      } else {
        setPosts(data.status);
      }
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div class="alert alert-warning" role="alert">
        {`error: ${data.error}`}
      </div>
    )
  }
  const imagesUrl = 'http://localhost:5000/uploads/';
  // if loaded load the products from the db
  return (
    <div className="postsContainer">
      {posts.map(post => (
        <div className="post" key={post.id}>
          <div className='picAndData'>
            <img className="rounded-image" src={`${imagesUrl}${post.owner.picture}`}></img>
            <div>{post.owner.name}</div>
            </div>
          <div className="background-text-color">{post.content}</div>
          <div className="picturesContainer">
            {post.pictures.map(picture => (
              <div key={picture} className="picture">
                <img src={`${imagesUrl}${picture}`}></img>
              </div>
            ))}
          </div>
          <div className="inlineContent">
            <div className='picAndData'>
              <img className="logo-image" src={require(`./assets/like-button.png`)}></img>
              <div>{post.likes.length}</div>
            </div>
            <div className='picAndData'>
              <img className="logo-image" src={require(`./assets/comments-logo.png`)}></img>
              <div>{post.comments.length}</div>
            </div>
          </div>
          <div className="comment-section">
            <textarea id='comment' placeholder="add a comment"></textarea>
            <img className='logo-image' src={require(`./assets/send-button.png`)}></img>
          </div>
        </div>
      ))}
    </div>
  )
}