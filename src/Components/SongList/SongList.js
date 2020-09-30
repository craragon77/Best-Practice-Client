import React, {Component} from 'react';
import MUSIC from '../Dummy-Music/Dummy-Music';
import Song from '../Song/Song';
import UserSongServices from '../../Services/User_Songs_Services';
import './SongList.css';
import {Link} from 'react-router-dom';

export default class SongList extends Component{
    constructor(props){
        super(props);
        this.state = {
            songs: []
        }
    }

    componentDidMount(){
        const id = window.localStorage.Token_Id;
        const token = window.localStorage.Authorization;
        UserSongServices.getUserSongsForHistoryPost(id, token)
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then(resJson => {
            console.log(resJson)
            this.setState({
                songs: resJson
            })
            console.log(this.state.songs)
        })
        .catch(err => {
            console.error('we are having errors find the right information, try again later; ' +  err)
        })
    }

    ifSongStateisEmpty = () => {
        if(this.state.songs.length == 0){
        return <h3>You don't have any songs in your repoitoire yet! Add something to practice <Link to="/AddSong">Here</Link></h3>
        }else{
            const music = this.state.songs.map((i) => {
                return (
                    <div key={i.id} className="song-list">
                        <Link to={`song/${i.song_id}/${i.id}`}><h2>{i.title} by {i.composer}</h2></Link>
                    </div>
                
                )
            })
            return music
        }
    }

    render(){
        //console.log(Object.values(MUSIC[0])) <= this gives me an error?
        let musicArray = Object.values(MUSIC)
        console.log(MUSIC)
        console.log(MUSIC.MUSIC[0])
        console.log(Object.values(musicArray[0][0]))
        /*let music = MUSIC.MUSIC.map((i) => 
            <Song key={i.id} song = {i}/>
        ) */
        //fallback if you mess it up
        /*const music = this.state.songs.map((i) => {
            return <Link to={`song/${i.song_id}/${i.id}`}><h2>{i.title} by {i.composer}</h2></Link>
        }) */
        
        return(
            <>
                <main className="SongList">
                    <h1>Your Songs</h1>
                    {this.ifSongStateisEmpty()}
                </main>
            </>
        )
    }
}