// function that handles posting of a comment

const handle = {
  comment: async (postId, comment, token) => {
    const url = `http://localhost:5000/comment/${postId}`;
    let response;
    try {
      response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({ comment }),
      });
    } catch (err) {
      console.log(err)
    }
    return response;
  }
};

export default handle;