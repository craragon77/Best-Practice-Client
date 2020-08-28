import React, {Component} from 'react';
import './AddSong.css';

export default class AddSong extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        alert('ayyoo your form was successfully submitted!')
    }
    render(){
        return(
            <>
                <form className="AddSong-Form">
                    <h1>Add a New Song to Reherse</h1>
                    <label htmlFor="title">Title</label><br/>
                    <input type="text" name="title"/><br/>
                    <label htmlFor="composer">Composer</label><br/>
                    <input type="text" name="composer"/><br/>
                    <label htmlFor="difficulty">Difficulty Level</label><br/>
                    <input type="radio" name="difficulty"/>Very Easy
                    <input type="radio" name="difficulty"/>Easy
                    <input type="radio" name="difficulty"/>Average
                    <input type="radio" name="difficulty"/>Challenging
                    <input type="radio" name="difficulty"/>Very Challenging<br/>
                    <label htmlFor="title">Date Started</label><br/>
                    <input type="date" name="date-started"/><br/>
                    <label htmlFor="title">Hours Rehersed So Far (if any)</label><br/>
                    <input type="number" name="hours rehersed thus far"/><br/>
                    <button onClick={this.handleSubmit}>Submit!</button>
                </form>
            </>
        )
    }
}