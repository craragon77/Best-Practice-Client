import React, {Component} from 'react';
import MUSIC from '../Dummy-Music/Dummy-Music';

export default class AddHours extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        alert('Click successful!')
    }
    render(){
        const songOptions = MUSIC.MUSIC.map(i => 
            <option value={i.title + 'by' + i.composer}>{i.title + ' by ' + i.composer}</option>
        )
        return(
            <>
                <h1>Log Practice Hours</h1>
                <form>
                    <label for="piece">Piece Rehersed</label><br/>
                    <select name="songs">
                        {songOptions}
                    </select><br/>
                    <label for="hours">How long did you practice?</label><br/>
                    <input type="number" name="hours"/><br/>
                    <label for="date">Date Practiced?</label><br/>
                    <input type="date" name="date"></input><br/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </>
        )
    }
}