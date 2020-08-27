import React, {Component} from 'react';
import MUSIC from '../Dummy-Music/Dummy-Music';
import Song from '../Song/Song';

export default class SongList extends Component{
    render(){
        const music = Object.keys(MUSIC).map(i => {
          return(
              <Song />
          )
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