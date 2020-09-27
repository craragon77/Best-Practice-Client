import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class PageNotFound extends Component{
    render(){
        return(
            <div>
                <h1>You hit a sour note!</h1><br/>
                <h3>
                    The page you are looking for cannot be found.<br/>
                    <Link to="/Dashboard">Click here</Link> to be redirected to the main page
                </h3>
            </div>
        )
    }
}