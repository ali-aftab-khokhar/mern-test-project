import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import ContextState from './contextState/contextState';
import Post from './Components/Posts/Post';

function App() {

  return (
    <div className='App-header'>
      <ContextState>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/posts' element={<Post />} />
            {/* <Route exact path='/posts' element={ <ParentPost />} />
            <Route exact path='/posts/notloggedin' element={ <NotLoggedInPost />} />
            <Route exact path='/posts/:id/comments' element={<ParentComments />} /> */}
          </Routes>
        </Router>
      </ContextState>
    </div>
  );
}

export default App;
