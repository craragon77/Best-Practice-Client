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
            info: ''
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
                
            })
        }
        
    render(){
        const history = this.state.history.map((i) => {
            return(
            <div key={i.id}>
                <p>Start Time: {Date(i.start_time)})</p>
                <p>End Time: {Date(i.end_time)}</p>
            </div>
            )
        })
        const practiceInfo = this.state.info
        //this.state.info.date_added = undefined
        //this.state.info[0].date_added = error message
        //practiceInfo.date_added = undefined
        //practiceInfo.info => undefined
        //how can I target the information that I need?
        console.log(practiceInfo)
        return(
            <>
            <div className = "Song-Container">
                <h1>{this.state.song.title}</h1>
                <h2>By {this.state.song.composer}</h2>
                <section>
                    <p>rehersal for {this.state.song.title} began on: </p>
                </section>
                <section>
                    {history}
                </section>
                
            </div>
            </>
        )
    }
}