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
        const title = this.state.title.trim()
        if(title == ' ' || title == null || !title){
            alert('please use a valid search term to complete your search request')
        }else{
            SongServices.getSongByTitle(token, title)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
            })
            .then(resJson => {
                this.setState({
                    results: resJson,
                    searched: true
                })
                console.log(this.state.results)
            })
            .catch(err => alert('we are unable to post your form', err))
            //why isn't the catch activating?
        }
        
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
        //what can I do about this.state.results when its undefined
        if((this.state.results == null || this.state.results.length == 0) &&(this.state.searched == true)){
            return <h4>We did not find anything in our database based on your search. <br/> You may research under a new term or contribute to the song to our database with the link above</h4>
        } else {
            return this.state.results.map((i) => {
                return (
                    <div key={i.id}>
                        <SongSearchResults id={i.id} title={i.title} composer={i.composer}/>
                    </div>
                
                )
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
                <form className="AddSong-Form" onSubmit={this.handleSubmit}>
                    <h1>Add a New Song to Rehearse</h1>
                    <label htmlFor="title">Title</label><br/>
                    <input type="text" name="title" onChange={this.handleTitleChange} required/><br/>
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
                    <button>Submit!</button>
                </form>
                <div className='results'>
                    {this.addToDatabaseLink()}
                    {this.handleResultsRendering()}
                </div>
            </>
        )
    }
}