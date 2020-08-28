import React from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import SongList from './Components/SongList/SongList';
import AddSong from './Components/AddSong/AddSong';
import AddHours from './Components/AddHours/AddHours';
import Header from './Components/Header/Header';
import {Route, Switch} from 'react-router-dom';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Loading from './Components/Loading/Loading';
import TitleBar from './Components/Title-Bar/Title-Bar';
import './App.css'

function App() {
  return (
    <div className="App">
      <TitleBar/>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/Dashboard" component={Dashboard}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Signup" component={Signup}/>
        <Route path="/AddHours" component={AddHours}/>
        <Route path="/AddSong" component={AddSong}/>
        <Route path="/SongList" component={SongList}/>
        <Route component={PageNotFound}/>
      </Switch>
    </div>
  );
}

export default App;
