// returns data about a user and the posts below it
import User from './user';
import UserPosts from './userPosts';
import { useParams } from "react-router-dom";

const AboutUser = () => {
  const userId = useParams().userId;
  return (
    <div>
      <User userId={userId}/>
      <UserPosts userId={userId}/>
    </div>
  )
}

export default AboutUser;