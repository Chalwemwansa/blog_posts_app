// component that is used to get user data from the database
import { useNavigate } from 'react-router-dom';
import './user.css'
import singout from './signout';
import deleteuser from './deleteuser';
import { useEffect, useState } from "react";

export default function User({ userId }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const url = `http://localhost:5000/user/${userId}`;
  const imageUrl = 'http://localhost:5000/uploads/';

  const [ data, setData ] = useState({});

  async function fetchData() {
    await fetch(url, {
      method: 'GET',
      headers: {
        token,
      },
    })
    .then(response => response.json())
    .then(data => {
      setData(data);
    });
  }

  function handledelete () {
    (async () => {
      await deleteuser();
      localStorage.removeItem('token');
      navigate('/');
    })();
  }

  function handlesignout () {
    (async () => {
      await singout();
      localStorage.removeItem('token');
      navigate('/');
    })();
  }

  useEffect(
    () => {
      (async () => {
        await fetchData();
      })();
    }, [data])

  function exists(item) {
    return (data[item] !== undefined);
  }

  return (
    <>
    <div className='main-user-container'>
      <div className='user-container'>
        <div className='user-pic'>
          {exists('picture') ?
            <img className="user-image" src={`${imageUrl}${data.picture}`}></img>:
            <img className="user-image" src={require('./assets/user.png')}></img>
          }
        </div>
        <div className="user-content">
          <div className='content-section'>
            <h5 className="section-name">name: </h5>
            <t className="section-content">{data.name}</t>
          </div>
          <div className='content-section'>
            <h5 className="section-name">email: </h5>
            <t className="section-content">{data.email}</t>
          </div>
          {exists('age') &&
            <div className='content-section'>
              <h5 className="section-name">age: </h5>
              <t className="section-content">{data.age}</t>
            </div>}
          {exists('gender') &&
            <div className='content-section'>
              <h5 className="section-name">gender: </h5>
              <t className="section-content">{data.gender}</t>
            </div>
          }
        </div>
          {exists('about') &&
            <div className="about-class">
              <h5 className='about-section'>about {data.name}</h5>
              <p className='about-content'>{data.about}</p>
            </div>}
            {(userId === 'owner') &&
              <div className='small-header'>
                <div className='small-header-component'
                  onClick={() => navigate('/editUser')}
                >
                  edit
                </div>
                <div className='small-header-component'
                  onClick={() => handlesignout()}
                >
                  signout
                </div>
                <div className='small-header-component'
                  onClick={() => handledelete()}
                >
                  delete account
                </div>
              </div>
            }
      </div>
    </div>
    <div className='u-p'>
        <h3>posts by {data.name}</h3>
    </div>
    </>
  )
};