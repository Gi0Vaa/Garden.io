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
import FirstGreenhouse from './pages/firstGreenhouse';
import Welcome from './pages/status/welcome';
import Error from './pages/status/error';
import Herbarium from './pages/herbarium';
import Plant from './pages/plant';

function App() {
  if (localStorage.getItem('email') !== null) {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/start' element={<FirstGreenhouse />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/herbarium' element={<Herbarium />} />
          <Route path='/plant' element={<Plant />} />
          <Route path='/error' element={<Error />} />
          <Route path='*' element={<Error data={{code: 404, status: "Page Not Found", message: "This page doesn't exist"}} />} />
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
