// helper module to the headers bar

const helper = {
  getUserPic: async () => {
    try {
      const url = 'http://localhost:5000/user/owner';
      let response;
      await fetch(url, {
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.picture) {
          response = data.picture;
        } else {
          response = null;
        }
      });
      return response;
    } catch {

    }
  },
};

export default helper;