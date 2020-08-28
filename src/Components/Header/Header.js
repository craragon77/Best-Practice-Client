import React, {Component} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import AddSong from '../AddSong/AddSong';
import AddHours from '../AddHours/AddHours';
import SongList from '../SongList/SongList';
import Signup from '../Signup/Signup';
import {Link} from 'react-router-dom';

export default class Header extends Component{
    render(){
        return(
            <div>
                <Link to="/">Home</Link>
                <Link to="/Dashboard">Your Practice Stats</Link>
                <Link to="/AddHours">Log Practice Hours</Link>
                <Link to="/SongList">Your Pieces</Link>
                <Link to="/AddSong">Add a New Song</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Signup">Sign Up</Link>
            </div>
        )
    }
}