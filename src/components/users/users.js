// component that is responsible for fetching the users in the api

import { useEffect, useState } from "react";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";
import './users.css'

const Users = () => {
  const navigate = useNavigate();
  const url = 'http://localhost:5000/users';
  const imageUrl = 'http://localhost:5000/uploads/';
  const token = localStorage.getItem('token');

  const [ users, setUsers ] = useState([]);

  async function fetchData () {
    try {
      await fetch(url, {
        method: 'GET',
        headers:{
          token,
        }
      })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
    } catch {

    }
  }

  useEffect(
    () => {
      (async () => {
        await fetchData();
      })();
    }, [users]);

    return (
      <>
        <Header caller={'users'}/>
        <div className="users-container">
          {users.map(user => (
            <div key={user.id} className="each-user">
              {(user.picture !== undefined) ?
                <img className='each-image' src={`${imageUrl}${user.picture}`}
                  onClick={() => navigate(`/user/${user.id}`)}
                ></img>:
                <img className='each-image' src={require('./assets/user.png')}
                  onClick={() => navigate(`/user/${user.id}`)}
                ></img>
              }
              <h4>{user.name}</h4>
            </div>
          ))}
        </div>
      </>
    )
}

export default Users;
