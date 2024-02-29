import './App.css';
//Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//pages
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

function App() {
  if (localStorage.getItem('email') !== null) {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
