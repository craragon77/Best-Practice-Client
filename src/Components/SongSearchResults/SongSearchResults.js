import React, {Component} from 'react';

export default class SearchSongResults extends Component{
    render(){
        return(
            <div key={this.props.key}>
                <h3>{this.props.title} by {this.props.composer}</h3>
            </div>
                
            
        )
    }
}