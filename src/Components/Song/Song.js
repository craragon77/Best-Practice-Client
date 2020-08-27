import React, {Component} from 'react';

export default class Song extends Component{
    render(){
        console.log(this.props.song.title)
        return(
            <>
                <div className = "Song-Containter" key={this.props.song.id}>
                    <h1>{this.props.song.title}</h1>
                    <h3>{this.props.song.composer}</h3>
                    <div className="song-information">
                        <p>Instrument: {this.props.song.instrument}</p>
                        <p>{this.props.song.difficulty} difficulty level</p>
                        <p>Date Added: {this.props.song.date_added}</p>
                        <p>Last practiced on: {this.props.song.last_rehersal}</p>
                        <p>Total hours practiced: {this.props.song.total_hours_rehersed}</p>
                    </div>
                </div>
            </>
        )
    }
}