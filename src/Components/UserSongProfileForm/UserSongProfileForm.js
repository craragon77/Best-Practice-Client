import React, {Component} from 'react';
import SongServices from '../../Services/SongServices';
import UserSongServices from '../../Services/User_Songs_Services';

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
        console.log(token)
        console.log(user_id)
        //console.log(song_id)
        SongServices.getSongById(song_id, token)
        .then(res => {
            if(res.ok){
                return res.json();
            }
        })
        .then(resJson => {
            console.log(resJson)
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
            console.log(resJson)
            for(let i = 0; i < resJson.length; i++){
                console.log('loop running')
                //resJson[i]
                if(resJson[i].song_id == song_id){
                    console.log('the state changed')
                    alert(`warning, ${this.state.title} by ${this.state.composer} has already been added to you repoitoire. While you are more than welcome to post this twice, be aware that you already have this song in your account`)
                }
                //return null
            }
        })
        .catch(error => console.error(error))

    }
    handleInstrument = (e) => {
        this.setState({
            instrument: e.target.value
        })
        console.log(this.state.instrument);
    }

    handleDifficulty = (e) => {
        this.setState({
            difficulty: e.target.value
        })
        console.log(this.state.difficulty)
    }
    
    handleHours = (e) => {
        this.setState({
            desired_hours: e.target.value
        })
        console.log(this.state.desired_hours)
    }

    handleComments = (e) => {
        this.setState({
            comments: e.target.value
        })
        console.log(this.state.comments)
    }


    handleDate = (e) => {
        this.setState({
            date_added: e.target.value
        })
    }

    //handleInSystem = (e) => {
      //  this.state.inSystem ? console.log('this activated') : null
    //}


    handleSubmit = (e) => {
        e.preventDefault(e)
        const token = window.localStorage.Authorization
        console.log(token)
        const song_id = window.location.pathname.split("/")[4]
        const title = this.state.title;
        const composer = this.state.composer;
        const instrument = this.state.instrument;
        const difficulty = this.state.difficulty;
        let date_added = this.state.date_added;
        const desired_hours = this.state.desired_hours;
        const comments = this.state.comments;
        const user_song = {song_id,title, composer, instrument, difficulty, desired_hours, comments, date_added}
        console.log(user_song)
        if(date_added == ""){
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
            .catch(err => console.log(err.error.message))
        }
        
        //
        
        /*UserSongServices.IdConfirmation(id, token)
            .then(res => {
                if(res.ok){
                    alert('you already have this song in your practice repoitoire. Songs may be added only once')
                }
            }) */
    }

    render(){
        return(
            <>
                <main>
                    <h3>
                        Before Adding {this.state.composer}'s {this.state.title} to your Repertoire,<br/>
                        What are your practice goals?
                    </h3>
                        <form onSubmit={this.handleSubmit}>
                        <label htmlFor="instrument">Instrument</label><br/>
                        <input type="text" name="instrument" onChange={this.handleInstrument}/><br/>
                        <label htmlFor="difficulty">Difficulty Level of the Piece (based on your skill level)</label><br/>
                            <input type="radio" name="difficulty" value="very easy" onChange={this.handleDifficulty} />Very Easy<br/>
                            <input type="radio" name="difficulty" value="easy" onChange={this.handleDifficulty} />Easy<br/>
                            <input type="radio" name="difficulty" value="average" onChange={this.handleDifficulty} />Average<br/>
                            <input type="radio" name="difficulty" value="challenging" onChange={this.handleDifficulty} />Challenging<br/>
                            <input type="radio" name="difficulty" value="very challenging" onChange={this.handleDifficulty} />Very Challenging<br/>
                        <label htmlFor="desired_hours">How much do you want to practice this piece (hours per week)</label><br/>
                        <input type="number" name="desired_hours" onChange={this.handleHours}/><br/>
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