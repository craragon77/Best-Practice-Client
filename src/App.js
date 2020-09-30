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
import PublicRoute from '../src/Components/Util/PublicRoute';
import PrivateRoute from '../src/Components/Util/PrivateRoute';
import Song from './Components/Song/Song';
import AddNewSongToDB from './Components/AddNewSongToDB/AddNewSongToDB';
import UserSongProfileForm from './Components/UserSongProfileForm/UserSongProfileForm';
import './App.css'

function App() {
  const styles = {
    main: {
      display:'flex',
      flexDirection:'column',
      alignItems: 'flex-start',
      //height: '100vh',
    }
  }
  return (
    <div className="App">
      
        <div style={styles.main}>
          <Header />
        </div>
        <TitleBar/>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <PrivateRoute path="/Dashboard" component={Dashboard}/>
        <PublicRoute path="/Login" component={Login}/>
        <PublicRoute path="/Signup" component={Signup}/>
        <PrivateRoute path="/AddHours" component={AddHours}/>
        <PrivateRoute path="/AddSong" component={AddSong}/>
        <PrivateRoute path="/SongList" component={SongList}/>
        <PrivateRoute path="/Song" component={Song}/>
        <PrivateRoute path="/AddNewSong" component={AddNewSongToDB}/>
        <PrivateRoute path="/AddUserSong/form/post" component={UserSongProfileForm}/>
        <Route component={PageNotFound}/>
      </Switch>
    </div>
  );
}

export default App;
