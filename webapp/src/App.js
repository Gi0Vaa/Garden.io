import './App.css';

import React from 'react';

//Router
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

//pages
import Home from './pages/home';
import Login from './pages/auth/login';
import Welcome from './pages/status/welcome';
import Error from './pages/status/error';
import Herbarium from './pages/herbarium';
import Plant from './pages/plant';
import Greenhouse from './pages/greenhouse';
import CreateGreenhouse from './pages/createGreenhouse';
import Registered from './pages/status/registered';

//context
import { UserContext } from './context/userContext';

function App() {
  const [user, setUser] = React.useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  if (user) {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/herbarium' element={<Herbarium />} />
            <Route path='/plant' element={<Plant />} />
            <Route path='/greenhouse' element={<Greenhouse />} />
            <Route path='/createGreenhouse' element={<CreateGreenhouse />} />
            <Route path='/error' element={<Error />} />
            <Route path='*' element={<Error data={{ code: 404, status: "Page Not Found", message: "This page doesn't exist" }} />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    );
  }
  else {
    return (
      <UserContext.Provider value={{ setUser }}>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/success' element={<Registered />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
