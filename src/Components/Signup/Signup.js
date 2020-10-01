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

    handleUsername = (e) => {
        e.preventDefault();
        this.setState({
            username: e.target.value
        });
    };

    handlePassword = (e) => {
        e.preventDefault();
        this.setState({
            password: e.target.value
        });
    };

    handleRepeatPassword = (e) => {
        e.preventDefault();
        this.setState({
            repeat_password: e.target.value
        });
    };

    handleNewUser = (e) => {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const repeat_password = this.state.repeat_password;
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
            )
            .catch(error => alert(error))

        } 
    }
    render(){
        return(
            <>
                
                <form className="Signup-Form">
                    <h1>Sign Up</h1>
                    <label htmlFor="username">Username</label><br/>
                    <input type="text" name="username" onChange={this.handleUsername}/><br/>
                    <label htmlFor="password">Password</label><br/>
                    <input type="password" name="password" onChange={this.handlePassword}/><br/>
                    <label htmlFor="password">Re-enter Password</label><br/>
                    <input type="password" name="repeat-password" onChange={this.handleRepeatPassword}/><br/>
                    <button onClick={this.handleNewUser}>Sign Up</button>
                </form>
            </>
        )
    }
}