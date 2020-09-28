import React,{Component} from 'react';
import SongServices from '../../Services/SongServices';

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
        if((!title) || (title === null || title == " ")){
            alert('please include the title of the song')
        } else if((!composer) || (composer === null || composer == " ")){
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
        console.log(this.state.title);
    }

    handleComposer = (e) => {
        this.setState({
            composer: e.target.value
        })
        console.log(this.state.title)
    }
    render(){
        return(
            <>
                <form className="AddNewSongForm" onSubmit={this.handleSubmit}>
                    <h1>Add New Song to the Database</h1>
                    <h3>
                        By adding new songs for others to practice, you help expand the Best Practice database library,
                        which allow other musicians to practice the same pieces and improve their musical ability and repoitoire.
                        When posting a new song, please add all information available (such as the catoloague number) so others have access to it.
                    </h3>
                    <label htmlFor="title">Title</label>
                    <input type="text" className='title_input' required onChange={this.handleTitle}/><br/>
                    <label htmlFor="composer">Composer/Artist</label>
                    <input type="text" className="composer" required onChange={this.handleComposer}/><br/>
                    <button type="submit">Submit to Database</button>
               </form>
            </>
        )
    }
}