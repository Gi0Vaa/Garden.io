import './App.css';
//Router
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { CookiesProvider, useCookies } from 'react-cookie';

//pages
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import FirstGreenhouse from './pages/firstGreenhouse';
import Welcome from './pages/status/welcome';
import Error from './pages/status/error';
import Herbarium from './pages/herbarium';
import Plant from './pages/plant';
import Greenhouse from './pages/greenhouse';
import CreateGreenhouse from './pages/createGreenhouse';
import Registered from './pages/status/registered';

function App() {
  const [Cookies] = useCookies(['user']);
  if (Cookies.user !== undefined){
    return (
      <CookiesProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/start' element={<FirstGreenhouse />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/herbarium' element={<Herbarium />} />
            <Route path='/plant' element={<Plant />} />
            <Route path='/greenhouse' element={<Greenhouse />} />
            <Route path='/createGreenhouse' element={<CreateGreenhouse />} />
            <Route path='/error' element={<Error />} />
            <Route path='*' element={<Error data={{code: 404, status: "Page Not Found", message: "This page doesn't exist"}} />} />
          </Routes>
        </Router>
      </CookiesProvider>
    );
  }
  else {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/success' element={<Registered />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
