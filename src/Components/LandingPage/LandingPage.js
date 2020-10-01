import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./LandingPage.css"

export default class LandingPage extends Component{
    render(){
        return(
            <>
                <div className="Explination">
                    <p>
                    Best Practice is an app for musicians to help them optimize how they rehearse.
                     Users are invited to log songs they are rehearsing and track how long and how frequently a song is rehearsed.
                    Best Practice tracks practice trends on the users behalf in order to better organize how we as musicians practice.
                    </p>
                </div>
                <div className="Register-div">
                    <Link to={"/Login"}><h3>Get Started Today!</h3></Link>
                </div>
            </>
            
        )
    }
}