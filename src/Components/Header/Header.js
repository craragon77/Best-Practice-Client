import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../Services/TokenService';
import "./Header.css";

export default class Header extends Component{
    constructor(props){
        super(props);
            this.state = {
                hasAuthToken: TokenService.hasAuthToken()
            }
    }

    componentDidMount(){
        window.onstorage = () => {
            this.setState({
                hasAuthToken: TokenService.hasAuthToken()
            });
        };
    }

    handleLogOutClick = () => {
        TokenService.clearAuthToken();
        this.setState({
            hasAuthToken: TokenService.hasAuthToken()
        });
    }

    renderLogOutLink = () => {
        return(
            <Link to='/' onClick={this.handleLogOutClick}>Signout</Link>
        );
    }

    renderLoginLink = () => {
        return(
            <>
                <Link to="/Login">Login</Link>
                <Link to="/Signup">Sign Up</Link>
            </>
            
        )
    }

    render(){
        return(
            <div className="Header-Links">
                <Link to="/">Home</Link>
                <Link to="/Dashboard">Your Practice Stats</Link>
                <Link to="/AddHours">Log Practice Hours</Link>
                <Link to="/SongList">Your Pieces</Link>
                <Link to="/AddSong">Add a New Song</Link>
                {this.state.hasAuthToken
                ? this.renderLogOutLink() : this.renderLoginLink()
                }
            </div>
        )
    }
}