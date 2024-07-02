// component that is used to get user data from the database
import './user.css'
import { useEffect, useState } from "react";

export default function User({ userId }) {
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

  useEffect(
    () => {
      (async () => {
        await fetchData();
      })();
    }
  )

  function exists(item) {
    return (data[item] !== undefined);
  }

  return (
    <>
      <div>
        <div>
          {exists('picture') ?
            <img className="user-image" src={`${imageUrl}${data.picture}`}></img>:
            <img className="user-image" src={require('./assets/user.png')}></img>
          }
        </div>
        <div className="user-content">
          <div>
            <h3 className="section-name">name: </h3>
            <h3 className="section-content">{data.name}</h3>
          </div>
          <div>
            <h3 className="section-name">email: </h3>
            <h3 className="section-content">{data.email}</h3>
          </div>
          {exists('age') &&
            <div>
              <h3 className="section-name">age: </h3>
              <h3 className="section-content">{data.age}</h3>
            </div>}
          {exists('gender') &&
            <div>
              <h3 className="section-name">gender: </h3>
              <h3 className="section-content">{data.gender}</h3>
            </div>
          }
        </div>
          {exists('about') &&
            <div className="about-class">
              <h3 className='section-name'>About {data.name}</h3>
              <p>{data.about}</p>
            </div>}
      </div>
    </>
  )
};