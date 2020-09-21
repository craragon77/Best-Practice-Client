import React, {Component} from 'react';
import MUSIC from '../Dummy-Music/Dummy-Music';
import SongServices from '../../Services/SongServices';
import UserSongServices from '../../Services/User_Songs_Services';
import PracticeHistoryService from '../../Services/Practice_History_Services';
import './AddHours.css'
import PracticeHistoryServices from '../../Services/Practice_History_Services';

export default class AddHours extends Component{
    constructor(props){
        super(props);
        this.state = {
            songs: [],
            hours: '',
            date: '',
            song_selected: ''
        }
    }
    componentDidMount(){
        const id = window.localStorage.Token_Id;
        const token = window.localStorage.Authorization;
        UserSongServices.getAllUserSongsBasedOnId(id, token)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            })
            .then(resJson => {
                //console.log(resJson)
                this.setState({
                    songs: resJson
                })
                console.log(this.state.songs)
            })
            .catch(error => alert(error));
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const token = window.localStorage.Authorization;
        let song_practiced = this.state.song_selected;
        let practice_hours = this.state.hours;
        let practice_date = (!this.state.date) ? new Date() : this.state.date
        let post_body = {song_practiced, practice_hours, practice_date}
        console.log(post_body)
        PracticeHistoryServices.postPracticeHistorySesson(token, post_body)
        .then(res => {
            if(res.ok){
                alert('you have successfully posted a practice session!')
            }
        })
        .catch(error => console.error(error))
    }
    handleDate = (e) => {
        this.setState({
            date: e.target.value
        })
        console.log(this.state.date)
    }
    handleHours = (e) => {
        this.setState({
            hours: e.target.value
        })
        console.log(this.state.hours)
    }

    handleSong = (e) => {
        //console.log(e.target.value);
        //console.log(value[0].value);
        console.log('the handle song activated')
        e.preventDefault(e)
        this.setState({
            song_selected: e.target.value
        })
        console.log(this.state.song_selected)
    }
    render(){
        const songOptions = this.state.songs.map(i => 
        <option key={i.id} value={i.id}>{i.title + ' by ' + i.composer}</option>
        )
        return(
            <>
                
                <form className="AddHours-Form">
                    <h1>Log Practice Hours</h1>
                    <label htmlFor="piece">Piece Rehersed</label><br/>
                    <select name="songs" value={this.state.song_selected} onChange={(e) => this.handleSong(e)}>
                        {songOptions}
                    </select><br/>
                    <label htmlFor="hours">How long did you practice?</label><br/>
                    <input type="number" name="hours" onChange={this.handleHours} /><br/>
                    <label htmlFor="date">Date Practiced?</label><br/>
                    <input type="date" name="date" onChange={this.handleDate}></input><br/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </>
        )
    }
}