import React, {Component} from 'react';
import MUSIC from '../Dummy-Music/Dummy-Music';
import Song from '../Song/Song';

export default class SongList extends Component{
    render(){
        //console.log(Object.values(MUSIC[0])) <= this gives me an error?
        let musicArray = Object.values(MUSIC)
        console.log(musicArray.values())
        //^^^ this gives 0?
        let music = musicArray.map((i) => 
            <p>filler until we get to the bottom of this</p>
        )
        return(
            <>
                <main>
                    <h1>Your Songs</h1>
                    {music}
                </main>
            </>
        )
    }
}