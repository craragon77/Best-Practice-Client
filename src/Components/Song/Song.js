import React, { Component } from 'react';
import SongServices from '../../Services/SongServices';
import UserSongServices from '../../Services/User_Songs_Services';
import moment from 'moment';
import './Song.css'

export default class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: '',
            history: [],
            info: [],
            delete: false
        }
    }
    componentDidMount() {
        const song_id = window.location.pathname.split("/")[2];
        const token = window.localStorage.Authorization;
        SongServices.getSongById(song_id, token)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(resJson => {
                this.setState({
                    song: resJson
                })
            })
            .catch(error => console.error('we are experiencing some technical difficulties. Try again later: ' + error))

        SongServices.getSongHistory(song_id, token)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(resJson => {
                this.setState({
                    history: resJson
                })
            })
            .catch(error => console.error('we are experiencing some technical difficulties. Try again later: ' + error))

        SongServices.getSongInfo(song_id, token)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(resJson => {
                this.setState({
                    info: resJson
                })
            })
            .catch(error => console.error(error))
    }

    handleDeleteConfirm = () => {
        this.setState({
            delete: true
        })
    }
    handleDelete = (e) => {
        const user_song_id = window.location.pathname.split("/")[3]
        const token = window.localStorage.Authorization;
        if (!this.state.delete) {
            alert('before deleting this song, you check the box below')
        } else {
            UserSongServices.deleteUserSong(token, user_song_id)
                .then(res => {
                    if (res.ok) {
                        alert(`you have successfully deleted ${this.state.song.title} from your account, as well as all associated history with that song`)
                        this.props.history.push('/SongList')
                    }
                })
                .catch(error => console.error(error))
        }

    }
    mapOverhistory = (e) => {
        return this.state.history.map((entry, i) => {
            if (!this.state.history[i].practice_date) {
                return <h3 key={entry.id}>You have yet to log any practice session for this piece</h3>
            } else {
                return (
                    <div key={entry.id}>
                        <p>Date: {moment(entry.practice_date).format("MM/DD/YYYY h:mm:ss a")}</p>
                        <p>Hours Logged During Practice: {entry.practice_hours}</p>
                        <hr />
                    </div>
                )
            }
          
        })

    }


    render() {
        let startDate, instrument, desired_hours, difficulty, comments
        let totalHours = 0;
        if (this.state.info && this.state.info.length > 0) {
            startDate = this.state.info[0].date_added
            instrument = this.state.info[0].instrument
            desired_hours = this.state.info[0].desired_hours
            difficulty = this.state.info[0].difficulty
            comments = this.state.info[0].comments
            for (let i = 0; i < this.state.history.length; i++) {
                totalHours += this.state.history[i].practice_hours
                
            }
        }


        return (
            <>
                <div className="Song-Container">
                    <section id="song-stats">
                    <h2>{this.state.song.title} <br/>By {this.state.song.composer}</h2>
                        <p>Played for the: {instrument}</p>
                        <p>Desired hours per week: {desired_hours} hours per week</p>
                        <p>Desired average hours per day: {Math.round((desired_hours * 60)/ 7)} minutes per day</p>
                        <p>Total hours rehearsed for this song: {Math.round(totalHours)} hour</p>
                        <p>Average per rehersal: {(Math.round(totalHours) / this.state.history.length) * 60} minutes</p>
                        <p>Rehearsal for {this.state.song.title} began on: {moment(startDate).format("MM/DD/YYYY h:mm:ss a")}</p>
                        <p>Difficulty level: {difficulty}</p>
                        <p>Comments: {comments || `none`}</p>
                    </section>
                    <section id="song-history">
                        <h3>Practice Log</h3>
                        {this.mapOverhistory()}
                    </section>
                    <section id="delete-section">
                        <h4>
                        By deleting this song, your practice history for this song will be permanently deleted from your account. Please check the box below if you would like to proceed.
                    </h4><br />
                        <div>
                            <label htmlFor="hours" />I agree to remove {this.state.song.title} by {this.state.song.composer} and its practice history<br />
                            <input type="checkbox" name="delete_confirmation" onClick={this.handleDeleteConfirm} /><br />
                        </div>
                        <button onClick={this.handleDelete}>Delete this song</button>
                    </section>
                </div>
            </>
        )
    }
}