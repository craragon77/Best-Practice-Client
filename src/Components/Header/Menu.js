import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../Services/TokenService';
import './Menu.css';

export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
          open: this.props.open? this.props.open:false,
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
                <Link to="/Login" onClick={this.props.onClick}>Login</Link><br/>
                <Link to="/Signup" onClick={this.props.onClick}>Sign Up</Link><br/>
            </>
            
        )
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.open !== this.state.open){
          this.setState({open:nextProps.open});
        }
    }

    
    render(){
        /*const styles={
            //these instructions don't seem to be taking
            container: {
              position: 'absolute',
              top: 0,
              left: 0,
              height: this.state.open? '100%': 0,
              width: '100vw',
              display: 'flex',
              flexDirection: 'column',
              background: 'black',
              opacity: 0.95,
              color: '#fafafa',
              transition: 'height 0.3s ease',
              zIndex: 2,
            },
            menuList: {
              paddingTop: '3rem',
            }
          } */
        return(
            <div className="link-container">
                {
                this.state.open?
                <div className="inner-link-container">
                    <Link to="/" onClick={this.props.onClick}>Home</Link><br/>
                    <Link to="/Dashboard" onClick={this.props.onClick}>Your Practice Stats</Link><br/>
                    <Link to="/AddHours" onClick={this.props.onClick}>Log Practice Hours</Link><br/>
                    <Link to="/SongList" onClick={this.props.onClick}>Your Pieces</Link><br/>
                    <Link to="/AddSong" onClick={this.props.onClick}> Add a New Song</Link><br/>
                    {this.state.hasAuthToken
                    ? this.renderLogOutLink() : this.renderLoginLink()
                    }
                </div>:null
            }
            </div>
            
        )
    }
}

