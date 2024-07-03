// a sticky header used for navigating backwards
import './back.css'
import { useNavigate } from "react-router-dom";

const Back = ({ page }) => {
  const navigate = useNavigate();
  // function that handles what happens when back arrow is pressed
  function handleBack () {
    navigate(-1);
  };

  return (
    <div className="back-bar-wrapper">
        <div className="back-bar">
          <img className='back-bar-image' src={require('./assets/back.png')}
            onClick={handleBack}
          ></img>
          <h3>{page}</h3>
        </div>
      </div>
  );
};

export default Back;
