import React, {Component} from 'react';
import SongServices from '../../Services/SongServices';
import TokenService from '../../Services/TokenService';
import './Song.css'

export default class Song extends Component{
    constructor(props){
        super(props);
        this.state = {
            song: '',
            history: [],
            info: []
        }
    }
    componentDidMount(){
        const id = window.location.pathname.split("/")[2];
        const token = window.localStorage.Authorization;
        SongServices.getSongById(id, token)
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
            .catch(error => console.error(error))
        
        SongServices.getSongHistory(id, token)
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
            .catch(error => console.error(error))
            
        SongServices.getSongInfo(id, token)
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
        }
    handleTotalPracticeHours(){
        let totalHoursPracticed = 0
        console.log(this.state.history)
        for(let i = 0; i <= this.state.history.length; i++){
            console.log(this.state.history[i])
            //console.log(this.state.history[i].practice_hours) => undefined
        }
        //console.log(totalHoursPracticed)
    }
    render(){
        const history = this.state.history.map((i) => {
            return(
            <div key={i.id}>
                <hr/>
                <p>Date: {Date(i.date_practiced)})</p>
                <p>Hours Logged During Practice: {i.practice_hours}</p>
            </div>
            )
        })
        
        let startDate, instrument, desired_hours, difficulty
        if(this.state.info && this.state.info.length > 0){
            console.log(this.state.info[0].date_added)
            startDate = this.state.info[0].date_added
            instrument = this.state.info[0].instrument
            desired_hours = this.state.info[0].desired_hours
            difficulty = this.state.info[0].difficulty
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
                    <p>Total Hours rehersed for this song: {this.handleTotalPracticeHours()}</p>
                    <p>rehersal for {this.state.song.title} began on: {Date(startDate)}</p>
                    <p>Difficulty level: {difficulty}</p>
                </section>
                <section>
                    {history}
                </section>
                
            </div>
            </>
        )
    }
}