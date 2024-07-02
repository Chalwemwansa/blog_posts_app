// component that is responsible for fetching the users in the api

import { useEffect, useState } from "react";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";

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
        <div>
          <Header caller={'users'}/>
          {users.map(user => (
            <div key={user.id}>
              {(user.picture !== undefined) ?
                <img src={`${imageUrl}${user.picture}`}
                  onClick={() => navigate(`/user/${user.id}`)}
                ></img>:
                <img src={require('./assets/user.png')}
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
