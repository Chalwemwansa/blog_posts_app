// contains the signin page logic for the app
import './signin.css';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = 'http://localhost:5000/signin';
    try {
      await fetch(url, {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.token !== undefined) {
          localStorage.setItem('token', data.token);
          navigate('/posts' + `/${data.token}`);
        }
      });
    } catch {
      navigate('/error');
    }
  }
  return (
    <>
    <div className='s-img'>
      <h3 className='s-word'>sign in</h3>
      <h7 className="s-word1" 
        onClick={() => navigate('/signup')}
      >sign up</h7>
    </div>
    <div className='form-container'>
      <form className='form-class' onSubmit={handleSignin}>
        <div className='form-element'>
          <label className="label-class">email</label>
          <input className="input-class" type='email' id='email' name='email' required></input>
        </div>
        <div className='form-element'>
          <label className="label-class">password</label>
          <input className="input-class" type='password' id='password' name='password' required></input>
        </div>
        <button type='submit' className='button-class form-element'>sign in</button>
      </form>
    </div>
  </>
  )
};

export default Signin;