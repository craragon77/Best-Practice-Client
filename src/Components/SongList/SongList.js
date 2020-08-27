import React, {Component} from 'react';
import MUSIC from '../Dummy-Music/Dummy-Music';
import Song from '../Song/Song';

export default class SongList extends Component{
    render(){
        let music = Object.values(MUSIC).map(i => {
            return(<Song title={i.title}/>)
        })
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