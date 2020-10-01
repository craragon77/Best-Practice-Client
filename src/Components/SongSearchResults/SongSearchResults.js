import React, {Component} from 'react';
import UserSongServices from '../../Services/User_Songs_Services';
import {Link} from 'react-router-dom';
import './SongSearchResults.css';

export default class SearchSongResults extends Component{
    constructor(props){
        super(props);
        this.state = {
            instrument: '',
            difficulty: '',
            desired_hours: '',
            comments: ''
        }
    }

    handleSubmit = (e) => {
        const token = window.localStorage.Authorization
        const title = this.props.title;
        const composer = this.props.composer;
        const instrument = this.state.instrument;
        const difficulty = this.state.difficulty;
        const desired_hours = this.state.desired_hours;
        const comments = this.state.comments;
        const user_song = {title, composer, instrument, difficulty, desired_hours, comments}
        if(({instrument, difficulty, desired_hours} === null) || !{instrument, difficulty, desired_hours}){
            alert('please include all the necessary fields to post a new song')
        } else{
            UserSongServices.postNewUserSong(user_song, token)
            .then(res => {
                if(res.ok){
                    alert(`you have successfully added ${title} by ${composer} to your repertoire!`)
                }
            })
            .catch(error => alert('we are unable to handle your request' + error))
        }
    }

    render(){
        return(
            <div className="search-results-container">
                <h3>{this.props.title} by {this.props.composer}</h3>
                <Link to={`/AddUserSong/form/post/${this.props.id}`}>Add To Repertoire</Link>
            </div>
        )
    }
}