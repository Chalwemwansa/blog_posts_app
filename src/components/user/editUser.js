// component that is used to edit a post

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <form onSubmit={handle}>
        <div>
          <label>name</label>
          <input type='text' name='name' id='name' value={name}
            onChange={(e) => setname(e.target.value)}
          ></input>
        </div>
        <div>
          <label>email</label>
          <input value={email} id='email' name='email'
            onChange={(e) => setemail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>age</label>
          <input value={age} id='age' name='age'
            onChange={(e) => setage(e.target.value)}
          ></input>
        </div>
        <div>
          <label>gender</label>
          <input value={gender} id='gender' name='gender'
            onChange={(e) => setgender(e.target.value)}
          ></input>
        </div>
        <div>
          <label>new picture</label>
          <input type='file' id='picture' name='picture'></input>
        </div>
        <div>
          <label>about</label>
          <input value={about} id='about' name='about'
            onChange={(e) => setabout(e.target.value)}
          ></input>
        </div>
        <button type='submit'>Edit</button>
      </form>
      <div>
        { haspic && <img src={require('./assets/delete.png')}
            onClick={() => handlePic()}
          ></img>
        }

        <img src={ picture }></img>
      </div>
    </div>
  )
};

export default EditUser;