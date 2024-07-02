// contains the signin page logic for the app
import './signin.css';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = 'http://localhost:5000/signin';
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
          navigate('/posts');
        }
      });
    
  }
  return (
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
        <button type='submit' className='button-class form-element'>signin</button>
      </form>
    </div>
  )
};

export default Signin;