import React from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import Song from './Components/Song/Song';
import SongList from './Components/SongList/SongList';

function App() {
  return (
    <div className="App">
      <SongList/>
    </div>
  );
}

export default App;
