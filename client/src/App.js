import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContextState from './contextState/contextState';
import Home from './pages/home/Home';
import Register from './pages/register/Register'
import Post from './pages/posts/Post';
import Comment from './pages/comments/Comments';
import NotFound from './pages/notFound/NotFound';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className='App-header'>
      <ToastContainer />
      <ContextState>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/posts' element={<Post />} />
            <Route exact path='/post/:id/comments' element={<Comment />} />
            <Route exact path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </ContextState>
    </div>
  );
}

export default App;
