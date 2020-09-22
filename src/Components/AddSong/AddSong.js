import React, {Component} from 'react';
import SongServices from '../../Services/SongServices';
import AddNewSongToDb from '../AddNewSongToDB/AddNewSongToDB';
import SongSearchResults from '../SongSearchResults/SongSearchResults';
import {Link} from 'react-router-dom';
import './AddSong.css';
import SearchSongResults from '../SongSearchResults/SongSearchResults';

export default class AddSong extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            results: [],
            searched: false
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
            this.setState({
                results: resJson,
                searched: true,
                title: ''
            })
            console.log(this.state.results)
        })
        .catch(err => console.error(err))
    }

    handleTitleChange = (e)=> {
        e.preventDefault();
        this.setState({
            title: e.target.value
        })
        console.log(this.state.title)
    }

    handleResultsRendering = () => {
        console.log('render function activate')
        if((this.state.results.length == 0) && (this.state.searched == true)){
            return null
        } else {
            return this.state.results.map((i) => {
                return <SongSearchResults key={i.id} title={i.title} composer={i.composer}/>
            })
        }
    }

    addToDatabaseLink = () => {
        console.log('the db link has activated');
        if(this.state.searched == true){
            return(
                <section>
                    <h4>Don't see what you're looking for?<br/>
                        Fill out <Link to={"/AddNewSong"}>this form to add it to your practice sessions</Link>!
                    </h4>
                </section>
            )
        }
    }
    
    render(){
        
        /*const results = this.state.results.map((i) => {
            return <SongSearchResults title={this.state.results[i].title} composer={this.state.results[i].composer}/>
        }) */
        return(
            <>
                <form className="AddSong-Form">
                    <h1>Add a New Song to Rehearse</h1>
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
                <div className='results'>
                    {this.addToDatabaseLink()}
                    {this.handleResultsRendering()}
                </div>
            </>
        )
    }
}