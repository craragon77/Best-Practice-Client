import React, {Component} from 'react';
import TokenService from '../../Services/TokenService';
import AuthApiService from '../../Services/auth-api-service';
import './Login.css'

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    };
    //handleClick = (e) => {
      //  e.preventDefault();
        //alert('The button was clicked!')
    //}

    handleUpdateUsername = (e) => {
        e.preventDefault();
        console.log('update username!')
        this.setState({
            username: e.target.value
        });
    };

    handleUpdatePassword = (e) => {
        e.preventDefault();
        console.log('update password');
        this.setState({
            password: e.target.value
        });
    };

    handleSubmitAuth = (e) => {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        console.log('the username is: ' + username);
        console.log('the password is: ' + password);
        console.log(AuthApiService.postLogin)
        AuthApiService.postLogin({username: username, password: password})
            .then(res => {
                if(res.ok){
                    console.log('the then statement has activated!')
                    console.log(res.authToken)
                    this.setState({
                        username: '',
                        password: ''
                    })
                    //cannot read authToken of undefined? res us undefined?
                    TokenService.saveAuthToken(res.authToken)
                }
            })
            .catch(err => {
                console.log('the catch statement has activated')
                console.log(err)
                this.setState({
                    error: err.error
                })
            })
    }
    render(){
        return(
            <>   
                <form class="Login-Form">
                    <h1>Login</h1>
                    <label for="username">Username</label><br/>
                    <input type="text" name="username" onChange={this.handleUpdateUsername}/><br/>
                    <label for="password">Password</label><br/>
                    <input type="password" name="password" onChange={this.handleUpdatePassword}/><br/>
                    <button onClick={this.handleSubmitAuth}>Login!</button>
                </form>
            </>
        )
    }
}