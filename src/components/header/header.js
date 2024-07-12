// this is the header component that will be there on all or
// most of the views
import helper from './helpers/helper';
import './header.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ caller, token }) => {
  const navigate = useNavigate();
  function add(page) {
    return (page === caller);
  }
  const [ ownerImage, setOwnerImage ] = useState(require('./assets/user.png'));
  (async () => {
    const image = await helper.getUserPic(token);
    if (image !== null) {
      setOwnerImage(`http://localhost:5000/uploads/${image}`);
    }
  })();
  const usersImage = require('./assets/users.png');
  const homeImage = require('./assets/home.png');
  const postImage = require('./assets/upload.png');

  return (
    <div className="header" id='main-header'>
      <div className='header-bar'>
        <div className='header-container'>
          {add('posts') ?
            <img src={homeImage} className='emphasis header-image'
              onClick={() => navigate('/posts' + `/${token}`)}
            ></img> :
            <img src={homeImage} className='header-image'
              onClick={() => navigate('/posts' + `/${token}`)}
            ></img>
          }
          {add('users') ?
            <img src={usersImage} className='emphasis header-image'
              onClick={() => navigate('/users' + `/${token}`)}
            ></img> :
            <img src={usersImage} className='header-image'
              onClick={() => navigate('/users' + `/${token}`)}
            ></img>
          }
          {add('post') ?
            <img src={postImage} className='emphasis header-image'
              onClick={() => navigate('/post' + `/${token}`)}
            ></img> :
            <img src={postImage} className='header-image'
              onClick={() => navigate('/post' + `/${token}`)}
            ></img>
          }
        </div>
        {add('user') ?
          <img src={ownerImage} className='owner-image'
            onClick={() => navigate('/user/owner' + `/${token}`)}
          ></img> :
          <img src={ownerImage} className='owner-image'
            onClick={() => navigate('/user/owner' + `/${token}`)}
          ></img>
        }
      </div>
    </div>
  )

};

export default Header;