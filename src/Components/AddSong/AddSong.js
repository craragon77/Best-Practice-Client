import React, {Component} from 'react';
import SongServices from '../../Services/SongServices';
import SongSearchResults from '../SongSearchResults/SongSearchResults';
import {Link} from 'react-router-dom';
import './AddSong.css';

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
        const title = this.state.title.trim()
        if(title === ' ' || title === null || !title){
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
            })
            .catch(err => alert('we are unable to post your form', err))
        }
        
    }

    handleTitleChange = (e)=> {
        e.preventDefault();
        this.setState({
            title: e.target.value
        })
        
    }

    handleResultsRendering = () => {
        if((this.state.results === null || this.state.results.length === 0) &&(this.state.searched === true)){
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
        if(this.state.searched === true){
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
        const styles={
            results: this.state.searched ? {
                textAlign: 'center',
                margin: '20px',
                padding: '10px',
            }: null,
            resultsLenth: this.state.searched ?{
                
                textAlign: 'center',
                fontWeight: '600'
            } : {display : 'none'}
        }
        return(
            <>
                <form className="AddSong-Form" onSubmit={this.handleSubmit}>
                    <h1>Add a New Song to Rehearse</h1>
                    <label htmlFor="title">Title</label><br/>
                    <input type="text" name="title" onChange={this.handleTitleChange} required/><br/>
                    <button>Submit!</button>
                </form>
                <div style={styles.results}>
                <p style={styles.resultsLenth}>Showing {this.state.results.length} result(s) based on your search</p>
                    {this.handleResultsRendering()}
                    {this.addToDatabaseLink()}
                </div>
            </>
        )
    }
}