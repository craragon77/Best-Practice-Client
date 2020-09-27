import React, {Component} from 'react';
import SongServices from '../../Services/SongServices';
import UserSongServices from '../../Services/User_Songs_Services';
import moment from 'moment';
import './Song.css'

export default class Song extends Component{
    constructor(props){
        super(props);
        this.state = {
            song: '',
            history: [],
            info: [],
            delete: false
        }
    }
    componentDidMount(){
        //console.log('the user_song id is ' + window.location.pathname.split("/")[3])
        
        const song_id = window.location.pathname.split("/")[2];
        const user_song_id = window.localStorage.Token_Id
        const token = window.localStorage.Authorization;
        SongServices.getSongById(song_id, token)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            })
            .then(resJson => {
                //console.log(resJson)
                this.setState({
                    song: resJson
                })
                console.log(this.state.song)
            })
            .catch(error => console.error('we are experiencing some technical difficulties. Try again later: ' + error))
        
        SongServices.getSongHistory(song_id, token)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            })
            .then(resJson => {
                //console.log(resJson)
                this.setState({
                    history: resJson
                })
                console.log(this.state.history)
            })
            .catch(error => console.error('we are experiencing some technical difficulties. Try again later: ' + error))
            
        SongServices.getSongInfo(song_id, token)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            })
            .then(resJson => {
                this.setState({
                    info: resJson
                })
                console.log('this.state.info is an array: ', Array.isArray(this.state.info))
                console.log(this.state.info)
            })
            .catch(error => console.error(error))

            console.log('the history is ' + this.state.history)
        }

        handleDeleteConfirm = () => {
            this.setState({
                delete: true
            })
        }
        //the handle delete method needs the user song id, something that this component doesn't have :(
        handleDelete = (e) => {
            const user_song_id = window.location.pathname.split("/")[3]
            const token = window.localStorage.Authorization;
            if(!this.state.delete){
                alert('before deleting this song, you check the box below')
            }else{
                UserSongServices.deleteUserSong(token,user_song_id)
                    .then(res => {
                        if(res.ok){
                            alert(`you have successfully deleted ${this.state.song.title} from your account, as well as all associated history with that song`)
                            this.props.history.push('/SongList')
                        }
                    })
                    .catch(error => console.error(error))
            }
            

        }


    /*handleTotalPracticeHours(){
        let totalHoursPracticed = 0
        console.log(this.state.history)
        for(let i = 0; i <= this.state.history.length; i++){
            console.log(this.state.history[i])
            //console.log(this.state.history[i].practice_hours) => undefined
            //also why is this calling a billion times
        }
        //console.log(totalHoursPracticed)
    } */
    render(){
        const history = this.state.history.map((i) => {
            return(
            <div key={i.id}>
                <hr/>
                <p>Date: {moment(i.practice_date).format("MM/DD/YYYY h:mm:ss a")}</p>
                <p>Hours Logged During Practice: {i.practice_hours}</p>
            </div>
            )
        })
        
        let startDate, instrument, desired_hours, difficulty
        let totalHours = 0;
        if(this.state.info && this.state.info.length > 0){
            console.log(this.state.info[0].date_added)
            startDate = this.state.info[0].date_added
            instrument = this.state.info[0].instrument
            desired_hours = this.state.info[0].desired_hours
            difficulty = this.state.info[0].difficulty
            for(let i = 0; i < this.state.history.length; i++){
                console.log(this.state.history[i].practice_date, new Date(this.state.history[i].practice_date))
                totalHours += this.state.history[i].practice_hours
                //also why is this calling a billion times
            }
            
            console.log(totalHours)
            //console.log(totalHoursPracticed)
        }

        
        return(
            <>
            <div className = "Song-Container">
                <h1>{this.state.song.title}</h1>
                <h2>By {this.state.song.composer}</h2>
                <section>
                    <p>played for the {instrument}</p>
                    <p>Desired Hours per week: {desired_hours} hours per week</p>
                    <p>Desired Average Hours per day: {Math.round(desired_hours / 7)} hours per day</p>
                    <p>Total Hours rehearsed for this song: {Math.round(totalHours)} hour</p>
                    <p>You have averaged {(Math.round(totalHours) / this.state.history.length) * 60} minutes per practice session</p>
                    <p>Rehearsal for {this.state.song.title} began on: {moment(startDate).format("MM/DD/YYYY h:mm:ss a")}</p>
                    <p>Difficulty level: {difficulty}</p>
                </section>
                <section>
                    {history}
                </section>
                <hr/>
                <section>
                    <h4>
                        Click below to remote this song, click the button below<br/>
                        By clicking below, this song, as well as all of the practice history of this song, will be perminately (and irritreviably) deleted from your account
                    </h4><br/>
                    <div>
                        <label htmlFor="hours"/>I understand that I will be perminately removing {this.state.song.title} by {this.state.song.composer} and its practice history<br/>
                        <input type="checkbox" name="delete_confirmation" onClick={this.handleDeleteConfirm}/><br/>
                    </div>
                    <button onClick={this.handleDelete}>Delete this song anyway</button>
                </section>
            </div>
            </>
        )
    }
}