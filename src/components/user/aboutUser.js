// returns data about a user and the posts below it
import User from './user';
import UserPosts from './userPosts';
import { useNavigate, useParams } from "react-router-dom";

const AboutUser = () => {
  const navigate = useNavigate();
  const userId = useParams().userId;
  return (
    <div>
      <User userId={userId}/>
      <div
        onClick={() => navigate('/editUser')}
      >Edit</div>
      <UserPosts userId={userId}/>
    </div>
  )
}

export default AboutUser;