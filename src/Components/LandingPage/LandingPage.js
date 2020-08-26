import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class LandingPage extends Component{
    render(){
        return(
            //never waste a minuet? is that a better one
            <>
                <div className="Title-Header">
                    <h1>Best Practice</h1>
                    <h3>Make Every <span id="minuet">"Minuet"</span> Count</h3>
                </div>
                <div className="Explination">
                    <p>
                    Best Practice is an app for musicians to help them optimize how they reherse.
                     Users are invited to log songs they are rehersing and track how long and how frequently a song is rehersed.
                    Best Practice tracks practice trends on the users behalf in order to better organize how we as musicians practice.
                    </p>
                </div>
                <div className="Register-div">
                    <h3>Get Started Today!</h3>
                </div>
            </>
            
        )
    }
}