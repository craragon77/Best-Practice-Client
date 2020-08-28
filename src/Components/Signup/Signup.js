import React, {Component} from 'react';
import './Signup.css'

export default class Signup extends Component{
    handleClick = (e) => {
        e.preventDefault();
        alert('The button was clicked!')
    }
    render(){
        return(
            <>
                
                <form className="Signup-Form">
                    <h1>Sign Up</h1>
                    <label for="username">Username</label><br/>
                    <input type="text" name="username" /><br/>
                    <label for="password">Password</label><br/>
                    <input type="password" name="password" /><br/>
                    <label for="password">Repeat-Password</label><br/>
                    <input type="repeat-password" name="repeat-password" /><br/>
                    <button onClick={this.handleClick}>Sign Up!</button>
                </form>
            </>
        )
    }
}