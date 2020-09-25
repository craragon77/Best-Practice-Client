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
            comments: ''
        }
    }
    componentDidMount(){
        const id = window.location.pathname.split("/")[4]
        const token = window.localStorage.Authorization;
        console.log(id)
        SongServices.getSongById(id, token)
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
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <>
                <main>
                    <h1>
                        Before Adding {this.state.composer}'s {this.state.title} to your Repertoire, <br/>
                        Tell us a little about your practice goals for the piece
                    </h1>
                        <form>
                        <label htmlFor="instrument">Instrument</label>
                        <input type="text" name="instrument" onChange={this.handleInstrument}/>
                        <label htmlFor="difficulty">Difficulty Level of the Piece (based on your skill level)</label>
                            <input type="radio" name="difficulty" value="very easy" onChange={this.handleDifficulty}>Very Easy</input>
                            <input type="radio" name="difficulty" value="easy" onChange={this.handleDifficulty}>Easy</input>
                            <input type="radio" name="difficulty" value="average" onChange={this.handleDifficulty}>Average</input>
                            <input type="radio" name="difficulty" value="challenging" onChange={this.handleDifficulty}>Challenging</input>
                            <input type="radio" name="difficulty" value="very challenging" onChange={this.handleDifficulty}>Very Challenging</input>
                        <label htmlFor="desired_hours">How much do you want to practice this piece (per week)</label>
                        <input type="number" name="desired_hours" onChange={this.handleInstrument}/>
                        <label htmlFor="comments">Comments</label>
                        <input type="text" name="comments" onChange={this.handleInstrument}/>
                        <button>Submit</button>
                        </form>
                </main>
            </>
        )
    }
}