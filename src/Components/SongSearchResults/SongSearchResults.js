import React, {Component} from 'react';
import UserSongServices from '../../Services/User_Songs_Services';

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
            <div key={this.props.key}>
                <form onSubmit>
                    <h3>{this.props.title} by {this.props.composer}</h3>
                    <label htmlFor="instrument">Instrument</label>
                    <input type="text" name="instrument" onChange={this.handleInstrument}/>
                    <label htmlFor="difficulty">Difficulty Level</label>
                    {/*<input type="radio" name="difficulty" value="very easy" onChange={this.handleDifficulty}>Very Easy</input>
                    <input type="radio" name="difficulty" value="easy" onChange={this.handleDifficulty}>Easy</input>
                    <input type="radio" name="difficulty" value="average" onChange={this.handleDifficulty}>Average</input>
                    <input type="radio" name="difficulty" value="challenging" onChange={this.handleDifficulty}>Challenging</input>
        <input type="radio" name="difficulty" value="very challenging" onChange={this.handleDifficulty}>Very Challenging</input> */}
                    <label htmlFor="desired_hours">How much do you want to practice this piece (per week)</label>
                    <input type="number" name="desired_hours" onChange={this.handleInstrument}/>
                    <label htmlFor="comments">Comments</label>
                    <input type="text" name="comments" onChange={this.handleInstrument}/>
                    <button>Submit</button>
                </form>
            </div>
                
            
        )
    }
}