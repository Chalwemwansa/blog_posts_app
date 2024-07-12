// function that us used to sign out a user

const singout = async (token) => {
  const url = 'http://localhost:5000/signout';
  try {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        token,
      }
    });
  } catch {

  }
}

export default singout;