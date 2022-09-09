import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContextState from './contextState/contextState';
import Home from './component/Home/Home'
import Register from './component/Register/Register'
import Post from './component/Posts/Post'
import Comment from './component/Comments/Comment'

function App() {

  return (
    <div className='App-header'>
      <ContextState>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/posts' element={<Post />} />
            <Route exact path='/post/:id/comments' element={<Comment />} />
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
