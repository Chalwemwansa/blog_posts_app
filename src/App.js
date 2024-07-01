import Signup  from './components/signup/signup';
import Posts from './components/posts/posts';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' Component={Signup}/>
          <Route path='/posts' Component={Posts}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
