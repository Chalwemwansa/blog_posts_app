import Signup  from './components/signup/signup';
import Posts from './components/posts/posts';
import Comments from './components/comments/comments';
import Signin from './components/signin/signin';
import Likes from './components/likes/likes';
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
