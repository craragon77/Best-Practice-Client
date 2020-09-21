import React, {Component} from 'react';
import SongServices from '../../Services/SongServices';
import './AddSong.css';

export default class AddSong extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: ''
        }
    }
    handleSubmit = (e) => {
        const token = window.localStorage.Authorization;
        e.preventDefault();
        console.log(this.state.title)
        SongServices.getSongByTitle(token, this.state.title)
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then(resJson => {
            console.log(resJson)
        })
        .catch(err => console.err(err))
    }

    handleTitleChange = (e)=> {
        e.preventDefault();
        this.setState({
            title: e.target.value
        })
        console.log(this.state.title)
    }
    render(){
        return(
            <>
                <form className="AddSong-Form">
                    <h1>Add a New Song to Reherse</h1>
                    <label htmlFor="title">Title</label><br/>
                    <input type="text" name="title" onChange={this.handleTitleChange}/><br/>
                    {/*<label htmlFor="composer">Composer</label><br/>
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
                    <input type="number" name="hours rehersed thus far"/><br/> */}
                    <button onClick={this.handleSubmit}>Submit!</button>
                </form>
            </>
        )
    }
}