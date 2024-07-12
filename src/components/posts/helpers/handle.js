// this file contains all the code for handling events for the post page

const handle = {
  like: async (postId, token) => {
    const url = `http://localhost:5000/like/${postId}`;
    let response;
    try {
      response = await fetch(url, {
        method: 'PUT',
        headers: {
          token,
        },
      });
    } catch {

    }

    return response;
  },

  delete: async (postId, token) => {
    const url = `http://localhost:5000/post/${postId}`;
    let response;
    try {
      response = await fetch(url, {
        method: 'DELETE',
        headers: {
          token,
        },
      });
    } catch {

    }

    return response;
  }
};

export default handle;