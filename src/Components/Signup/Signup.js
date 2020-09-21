import React, {Component} from 'react';
import UserServices from '../../Services/UserServices';

import './Signup.css'

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            repeat_password: ''
        }
    }

    /*handleClick = (e) => {
        e.preventDefault();
        alert('The button was clicked!')
    } */

    handleUsername = (e) => {
        e.preventDefault();
        console.log('username updated');
        this.setState({
            username: e.target.value
        });
    };

    handlePassword = (e) => {
        e.preventDefault();
        console.log('password update');
        this.setState({
            password: e.target.value
        });
    };

    handleRepeatPassword = (e) => {
        e.preventDefault();
        console.log('repeat password updated')
        this.setState({
            repeat_password: e.target.value
        });
    };

    handleNewUser = (e) => {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const repeat_password = this.state.repeat_password;
        console.log('the username is: ' + username);
        console.log('the password is: ' + password);
        console.log('the username is: ' + repeat_password);
        if(password !== repeat_password){
            alert('your passwords must match before you can make an account')
        } else{
            UserServices.postNewUser({
            username: username,
            password: password
            })
            .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json().then(res => {
                    this.setState({
                        username: '',
                        password: '',
                        repeat_password: ''
                    })
                }).then(alert('you have successfully made an account. You will now be redirected to the login page to access it'), this.props.history.push('/Login'))
                
                //look into how one could throw in the jwt web token handling so they don't need to log in a second time
                //(or not depending on how much time you have lolol)
        )
        } 
    }
    render(){
        return(
            <>
                
                <form className="Signup-Form">
                    <h1>Sign Up</h1>
                    <label for="username">Username</label><br/>
                    <input type="text" name="username" onChange={this.handleUsername}/><br/>
                    <label for="password">Password</label><br/>
                    <input type="password" name="password" onChange={this.handlePassword}/><br/>
                    <label for="password">Repeat-Password</label><br/>
                    <input type="password" name="repeat-password" onChange={this.handleRepeatPassword}/><br/>
                    <button onClick={this.handleNewUser}>Sign Up!</button>
                </form>
            </>
        )
    }
}