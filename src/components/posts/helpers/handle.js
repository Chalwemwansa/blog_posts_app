// this file contains all the code for handling events for the post page
const token = localStorage.getItem('token');

const handle = {
  like: async (postId) => {
    const url = `http://localhost:5000/like/${postId}`

    const response = await fetch(url, {
      method: 'PUT',
    });

    return response;
  },

  comment: async (postId, comment) => {
    const url = `http://localhost:5000/comment/${postId}`;

    const reponse = await fetch(url, {
      method: 'PUT',
      data: JSON.stringify({ comment, }),
    });
  }
};

export default handle;