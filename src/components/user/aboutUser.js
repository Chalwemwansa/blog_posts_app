// returns data about a user and the posts below it
import User from './user';
import UserPosts from './userPosts';
import { useParams } from "react-router-dom";

const AboutUser = () => {
  const token = useParams().token;
  const userId = useParams().userId;
  return (
    <div>
      <User userId={userId} token={token}/>
      <UserPosts userId={userId} token={token}/>
    </div>
  )
}

export default AboutUser;