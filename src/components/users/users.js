// component that is responsible for fetching the users in the api

import { useEffect, useState } from "react";
import Header from "../header/header";
import { useNavigate, useParams } from "react-router-dom";
import './users.css'

const Users = () => {
  const token = useParams().token;
  const navigate = useNavigate();
  const url = 'http://localhost:5000/users';
  const imageUrl = 'http://localhost:5000/uploads/';

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
        <Header caller={'users'} token={token}/>
        <div className="users-container">
          <div className="u-header">
            <h2 className="u-text">users</h2>
          </div>
          {users.map(user => (
            <div key={user.id} className="each-user">
              {(user.picture !== undefined) ?
                <img className='each-image' src={`${imageUrl}${user.picture}`}
                  onClick={() => navigate(`/user/${user.id}/${token}`)}
                ></img>:
                <img className='each-image' src={require('./assets/user.png')}
                  onClick={() => navigate(`/user/${user.id}/${token}`)}
                ></img>
              }
              <h4 className="u-word">{user.name}</h4>
            </div>
          ))}
        </div>
      </>
    )
}

export default Users;
