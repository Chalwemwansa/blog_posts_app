import Signup  from './components/signup/signup';
import Posts from './components/posts/posts';
import Comments from './components/comments/comments';
import Signin from './components/signin/signin';
import Likes from './components/likes/likes';
import AboutUser from './components/user/aboutUser';
import Users from './components/users/users';
import Post from './components/post/post';
import EditPost from './components/post/editPost';
import EditUser from './components/user/editUser';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' Component={Signin}/>
          <Route path='/signup' Component={Signup}/>
          <Route path='/posts' Component={Posts}/>
          <Route path='/comments/:postId' Component={Comments}/>
          <Route path='/likes/:postId' Component={Likes}/>
          <Route path='/user/:userId' Component={AboutUser}/>
          <Route path='/users' Component={Users}/>
          <Route path='/post' Component={Post}/>
          <Route path='/editPost/:postId' Component={EditPost}/>
          <Route path='/editUser' Component={EditUser}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
