// function that us used to sign out a user

const deleteuser = async (token) => {
  const url = 'http://localhost:5000/user';
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

export default deleteuser;