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
import Err from './components/error/error';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' Component={Signin}/>
          <Route path='/signup' Component={Signup}/>
          <Route path='/posts/:token' Component={Posts}/>
          <Route path='/comments/:postId/:token' Component={Comments}/>
          <Route path='/likes/:postId/:token' Component={Likes}/>
          <Route path='/user/:userId/:token' Component={AboutUser}/>
          <Route path='/users/:token' Component={Users}/>
          <Route path='/post/:token' Component={Post}/>
          <Route path='/editPost/:postId/:token' Component={EditPost}/>
          <Route path='/editUser/:token' Component={EditUser}/>
          <Route path='/error' Component={Err}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
