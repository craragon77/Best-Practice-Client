import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../Services/TokenService';
import "./Header.css";

export default class Header extends Component{
    constructor(props){
        super(props);
            this.state = {
                hasAuthToken: TokenService.hasAuthToken(),
                menuOpen: false
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

    handleMenuClick() {
        this.setState({menuOpen:!this.state.menuOpen});
    }
    
    handleLinkClick() {
        this.setState({menuOpen: false});
    }

    render(){
        const styles= 
        {
          container:{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: '99',
            opacity: 0.9,
            display:'flex',
            alignItems:'center',
            background: 'black',
            width: '100%',
            color: 'white',
            fontFamily:'Lobster',
          },
          logo: {
            margin: '0 auto',
          },
          body: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            filter: this.state.menuOpen ? 'blur(2px)':null,
            transition: 'filter 0.5s ease',
          },
        }
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