import React, {Component} from 'react';

export default class Song extends Component{
    render(){
        console.log(this.props.title)
        return(
            <>
                <div className = "Song-Containter" key={this.props.id}>
                    <h1>{this.props.title}</h1>
                    <h3>{this.props.composer}</h3>
                    <div className="song-information">
                        <p>Instrument: {this.props.instrument}</p>
                        <p>{this.props.difficulty} difficulty level</p>
                        <p>Date Added: {this.props.date_added}</p>
                        <p>Last practiced on: {this.props.last_rehersal}</p>
                        <p>Total hours practiced: {this.props.total_hours_rehersed}</p>
                    </div>
                </div>
            </>
        )
    }
}