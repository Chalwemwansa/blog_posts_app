// error component 
import { useNavigate } from 'react-router-dom';
import './error.css'
const Err = () => {
  const navigate = useNavigate();
  return (
    <div className='dele'>
      <img className='dele-pic' src={require('./assets/delete.png')}
        onClick={() => navigate('/')}
      ></img>
      <h1 className='dele-word' >Error</h1>
    </div>
  );
}

export default Err;