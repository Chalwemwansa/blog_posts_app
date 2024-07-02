// component that is responsible for fetching the users in the api

import { useEffect } from "react";

const Users = () => {
  const url = 'http://localhost:5000/users';
  const imageUrl = 'http://localhost:5000/uploads';
  const token = localStorage.getItem('token');

  const [ users, setUsers ] = useEffect([]);

  async function fetchData () {
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
          {users.map(user => (
            <div key={user.id}>
              {(user.picture !== undefined) ?
                <img src={`${imageUrl}${user.picture}`}></img>:
                <img src={require('./assets/user.png')}></img>
              }
              <h4>{user.name}</h4>
            </div>
          ))}
        </div>
      </>
    )
}

export default Users;
