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
        AuthApiService.postLogin({
            username: username, password: password
        })
            .then(res => {
                (!res.ok)
                ? res.json().then(err => alert(err.error)).then(e => Promise.reject(e))
                : res.json().then(res => TokenService.saveAuthToken(res.authToken) + TokenService.saveUserId(res.user_id))
                //.then(() => {this.props.history.push('/Dashboard')})
                .then(() => {window.location.href = '/dashboard';})
                //how would I go about redirecting both updating the state and redirecting the user to the dashboard
                //: res.json().then(res => {/*update state;*/ TokenService.saveAuthToken(res.authToken); /*do some other thing; this.props.history.push('/dashboard');*/})
            })
            .catch(error => alert(error))
            
    }
    render(){
        return(
            <>   
                <form className="Login-Form">
                    <h1>Login</h1>
                    <label htmlFor="username">Username</label><br/>
                    <input type="text" name="username" onChange={this.handleUpdateUsername}/><br/>
                    <label htmlFor="password">Password</label><br/>
                    <input type="password" name="password" onChange={this.handleUpdatePassword}/><br/>
                    <button onClick={this.handleSubmitAuth}>Login</button>
                </form>
                <div className="Demo">
                    <p>Feel free to use the demo account!<br/>Username: DemoUser<br/>Password: Demopassword1!</p>
                </div>
            </>
        )
    }
}