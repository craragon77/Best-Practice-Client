import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../Services/TokenService';
import "./Header.css";

export default class Header extends Component{
    handleLogOut = () => {
        TokenService.clearAuthToken()
    }

    render(){
        return(
            <div className="Header-Links">
                <Link to="/">Home</Link>
                <Link to="/Dashboard">Your Practice Stats</Link>
                <Link to="/AddHours">Log Practice Hours</Link>
                <Link to="/SongList">Your Pieces</Link>
                <Link to="/AddSong">Add a New Song</Link>
                {/*{TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()} */}
                <Link to="/Login">Login</Link>
                <Link to="/Signup">Sign Up</Link>
                
            </div>
        )
    }
}