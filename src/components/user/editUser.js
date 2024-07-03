// component that is used to edit a post

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from '../header/header';
import './editUser.css';

const EditUser = () => {
  const userId = useParams().postId;
  const token = localStorage.getItem('token');
  // url for editing and getting a post
  const url = `http://localhost:5000/user`;
  const imageUrl = 'http://localhost:5000/uploads/';

  const [ name, setname ] = useState('');
  const [picture, setpicture] = useState(require('./assets/user.png'));
  const [ email, setemail ] = useState('');
  const [ age, setage ] = useState('');
  const [ gender, setgender ] = useState('');
  const [ about, setabout ] = useState('');
  const [ haspic, sethaspic ] = useState(false);

  async function fetchData () {
    const getUrl = url + '/owner';
    await fetch(getUrl, {
      method: 'GET',
      headers: {
        token,
      }
    })
    .then(response => response.json())
    .then(data => {
      setage(data.age);
      setabout(data.about);
      setemail(data.email);
      setgender(data.gender);
      setname(data.name);
      setpicture(`${imageUrl}${data.picture}`);
      if (data.picture !== undefined) {
        sethaspic(true);
      }
      if (data.picture === undefined) {
        sethaspic(false);
        setpicture(require('./assets/user.png'))
      }
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

  function handlePic () {
    const imgUrl =  'http://localhost:5000/user/picture';
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
    <>
    <Header caller={'user'}/>
    <div className="main-of-user">
      <div className="pic-of-user">
        { haspic && <img className="user-del" src={require('./assets/delete.png')}
            onClick={() => handlePic()}
          ></img>
        }
        <img className="usr" src={ picture }></img>
      </div>
      <form onSubmit={handle} className="m-form">
        <div className="m-subform">
        <div className="m-section">
          <label>name:</label>
          <input type='text' name='name' id='name' value={name}
            className="m-input"
            onChange={(e) => setname(e.target.value)}
          ></input>
        </div>
        <div className="m-section">
          <label>email:</label>
          <input value={email} id='email' name='email'
            className="m-input"
            onChange={(e) => setemail(e.target.value)}
          ></input>
        </div>
        <div className="m-section">
          <label>age:</label>
          <input value={age} id='age' name='age'
            className="m-input"
            onChange={(e) => setage(e.target.value)}
          ></input>
        </div>
        <div className="m-section">
          <label>gender:</label>
          <input value={gender} id='gender' name='gender'
            className="m-input"
            onChange={(e) => setgender(e.target.value)}
          ></input>
        </div>
        <div className="m-section">
          <label>new picture:</label>
          <input type='file' id='picture' name='picture'
            className="m-input m-img"
          ></input>
        </div>
        <div className="m-section">
          <label>about {name}</label>
          <input value={about} id='about' name='about'
            className="m-about"
            onChange={(e) => setabout(e.target.value)}
          ></input>
        </div>
        <button className="m-button" type='submit'>Edit</button>
      </div>
      </form>
    </div>
    </>
  )
};

export default EditUser;