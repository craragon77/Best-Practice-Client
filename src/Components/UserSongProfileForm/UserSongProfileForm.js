import React, {Component} from 'react';
import SongServices from '../../Services/SongServices';
import UserSongServices from '../../Services/User_Songs_Services';
import './UserSongProfileForm.css'

export default class UserSongProfileForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            composer: '',
            difficulty: '',
            instrument: '',
            desired_hours: '',
            comments: '',
            date_added: ''
        }
    }
    componentDidMount(){
        const user_id = window.localStorage.Token_Id;
        const song_id = window.location.pathname.split("/")[4]
        const token = window.localStorage.Authorization;
        SongServices.getSongById(song_id, token)
        .then(res => {
            if(res.ok){
                return res.json();
            }
        })
        .then(resJson => {
            this.setState({
                title: resJson.title,
                composer: resJson.composer
            })
        })
        UserSongServices.simpleGetUserSongsConfirmation(user_id, token)
        .then(res => {
            if(res.ok){
                return res.json();
            }
            
        })
        .then(resJson => {
            for(let i = 0; i < resJson.length; i++){
                if(resJson[i].song_id === song_id){
                    alert(`Alert: ${this.state.title} by ${this.state.composer} has already been added to your repertoire. You can proceed to add this to your repertoire again or, if this was a mistake, you can return to the home page.`)
                }
            }
        })
        .catch(error => alert('we are experiencing some technical difficulties. Try again later; ' + error))

    }
    handleInstrument = (e) => {
        this.setState({
            instrument: e.target.value
        })
    }

    handleDifficulty = (e) => {
        this.setState({
            difficulty: e.target.value
        })
    }
    
    handleHours = (e) => {
        this.setState({
            desired_hours: e.target.value
        })
    }

    handleComments = (e) => {
        this.setState({
            comments: e.target.value
        })
    }


    handleDate = (e) => {
        this.setState({
            date_added: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault(e)
        const token = window.localStorage.Authorization
        const song_id = window.location.pathname.split("/")[4]
        const title = this.state.title;
        const composer = this.state.composer;
        const instrument = this.state.instrument;
        const difficulty = this.state.difficulty;
        let date_added = this.state.date_added;
        const desired_hours = this.state.desired_hours;
        const comments = this.state.comments;
        const user_song = {song_id,title, composer, instrument, difficulty, desired_hours, comments, date_added}
        if(date_added === ""){
            date_added = Date()
        }
        if(({instrument, difficulty, desired_hours} === null) || !{instrument, difficulty, desired_hours}){
            alert('please include all the necessary fields to post a new song')
        }else{
            UserSongServices.postNewUserSong(user_song, token)
            .then(res => {
                if(res.ok){
                    alert(`you have successfully added ${title} by ${composer} to your repertoire!`)
                    this.props.history.push('/SongList')
                }
            })
            .catch(err => alert('we are unable to handle your request. please try again later: ' + err))
        }
    }

    render(){
        return(
            <>
                <main className="form-itself">
                    <h3>
                        Before Adding {this.state.composer}'s {this.state.title} to your Repertoire,<br/>
                        What are your practice goals?
                    </h3>
                        <form onSubmit={this.handleSubmit}>
                        <label htmlFor="instrument">Instrument</label><br/>
                        <input type="text" name="instrument" onChange={this.handleInstrument} required/><br/>
                        <div>
                            <label htmlFor="difficulty">Difficulty Level of the Piece <br/>(based on your skill level)</label><br/>
                            <input className="radio-button" type="radio" name="difficulty" value="very easy" onChange={this.handleDifficulty} required/>Very Easy<br/>
                            <input className="radio-button" type="radio" name="difficulty" value="easy" onChange={this.handleDifficulty} required/>Easy<br/>
                            <input className="radio-button" type="radio" name="difficulty" value="average" onChange={this.handleDifficulty} required/>Average<br/>
                            <input className="radio-button" type="radio" name="difficulty" value="challenging" onChange={this.handleDifficulty} required/>Challenging<br/>
                            <input className="radio-button" type="radio" name="difficulty" value="very challenging" onChange={this.handleDifficulty} required/>Very Challenging<br/>
                        </div>
                        
                        <label htmlFor="desired_hours">How much do you want to practice this piece (hours per week)</label><br/>
                        <input type="number" name="desired_hours" onChange={this.handleHours} required/><br/>
                        <label htmlFor="date_started">When did you start practicing this piece (if today, just leave this part blank)</label><br/>
                        <input type="date" name="date"/><br/>
                        <label htmlFor="comments">Comments</label><br/>
                        <input type="text" name="comments" onChange={this.handleComments}/><br/>
                        <button>Submit</button>
                        </form>
                </main>
            </>
        )
    }
}