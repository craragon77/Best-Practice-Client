import React, {Component} from 'react';
import MUSIC from '../Dummy-Music/Dummy-Music';
import Song from '../Song/Song';
import './SongList.css'

export default class SongList extends Component{
    render(){
        //console.log(Object.values(MUSIC[0])) <= this gives me an error?
        let musicArray = Object.values(MUSIC)
        console.log(MUSIC)
        console.log(MUSIC.MUSIC[0])
        console.log(Object.values(musicArray[0][0]))
        let music = MUSIC.MUSIC.map((i) => 
            <Song key={i.id} song = {i}/>
        )
        return(
            <>
                <main className="SongList">
                    <h1>Your Songs</h1>
                    {music}
                </main>
            </>
        )
    }
}