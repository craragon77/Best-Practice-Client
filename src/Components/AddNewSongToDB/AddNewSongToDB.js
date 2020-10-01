import React,{Component} from 'react';
import SongServices from '../../Services/SongServices';
import './AddNewSongToDB.css'

export default class AddNewSongToDB extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            composer: ''
        }
    }
    handleSubmit = (e) => {
        const token = window.localStorage.Authorization
        const title = this.state.title;
        const composer = this.state.composer;
        const newSong = {title, composer};
        if((!title) || (title === null || title === " ")){
            alert('please include the title of the song')
        } else if((!composer) || (composer === null || composer === " ")){
            alert('please include the composer or artist of the song')
        } else{
            SongServices.postNewSong(token, newSong)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
            })
            .then(success => alert(
                `you have successfully added ${title} by ${composer} to the archives!
                you may find the new entry in the Find Songs page!`
                ), this.props.history.push('/AddSong'))
            .catch(error => alert(error))
        }   
    }

    handleTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleComposer = (e) => {
        this.setState({
            composer: e.target.value
        })
    }
    render(){
        return(
            <>
                <form className="AddNewSongForm" onSubmit={this.handleSubmit}>
                    <h3>Add New Song to the Database</h3>
                    <p id="disclaimer">
                    By uploading a new song, you will add it to the Best Practice database for other users’ usage as well. Please complete all fields to add it to the database correctly, and include all information available (key, song type, catalog number, etc)
                    </p>
                    <label htmlFor="title">Title</label><br/>
                    <input type="text" className='title_input' required onChange={this.handleTitle}/><br/>
                    <label htmlFor="composer">Composer/Artist</label><br/>
                    <input type="text" className="composer" required onChange={this.handleComposer}/><br/>
                    <button type="submit">Submit to Database</button>
               </form>
            </>
        )
    }
}