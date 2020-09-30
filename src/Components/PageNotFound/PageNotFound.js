import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './PageNotFound.css';

export default class PageNotFound extends Component{
    render(){
        return(
            <div className="PageNotFound">
                <h2>You hit a sour note!</h2><br/>
                <h4>
                    The page you are looking for cannot be found.<br/>
                    <Link to="/Dashboard">Click here</Link> to be redirected to the main page
                </h4>
            </div>
        )
    }
}