import React, {Component} from 'react';
import './Title-Bar.css';

export default class TitleBar extends Component{
    render(){
        return(
            <div className="Title-Header">
                <h1>Best Practice</h1>
                <h3>Make Every <span id="minuet">"Minuet"</span> Count</h3>
            </div>
        )
    }
}