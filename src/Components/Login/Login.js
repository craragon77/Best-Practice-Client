import React, {Component} from 'react';
import './Login.css'

export default class Login extends Component{
    handleClick = (e) => {
        e.preventDefault();
        alert('The button was clicked!')
    }
    render(){
        return(
            <>  
                
                <form class="Login-Form">
                    <h1>Login</h1>
                    <label for="username">Username</label><br/>
                    <input type="text" name="username" /><br/>
                    <label for="password">Password</label><br/>
                    <input type="password" name="password" /><br/>
                    <button onClick={this.handleClick}>Login!</button>
                </form>
            </>
        )
    }
}