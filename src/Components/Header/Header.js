import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../Services/TokenService';
import Menu from './Menu';
import MenuButton from './MenuButton';
import Footer from './footer';
import "./Header.css";

export default class Header extends Component{
    constructor(props){
        super(props);
            this.state = {
                menuOpen:false,
                hasAuthToken: TokenService.hasAuthToken()
            }
    }

    handleMenuClick() {
      this.setState({menuOpen:!this.state.menuOpen});
    }
    
    handleLinkClick() {
      this.setState({menuOpen: false});
    }

    handleHover(){
        this.setState({hover:!this.state.hover});
    }

    render(){
        const styles= {
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
            body: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                filter: this.state.menuOpen ? 'blur(2px)':null,
                transition: 'filter 0.5s ease',
            }
        }
        return(
            <div className="Header-Links">
                <div style={styles.container}>
                    <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='white'/>
                </div>
                <Menu open={this.state.menuOpen} onClick={() =>this.handleLinkClick()}/>
                
            </div>
        )
    }
}