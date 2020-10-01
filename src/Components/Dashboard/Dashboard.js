import React, {Component} from 'react';
import UserServices from '../../Services/UserServices';
import moment from 'moment';
import {Link} from 'react-router-dom';
import "./Dashboard.css"


export default class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = ({
            username: '',
            data: [],
            mostRecentId: ''
        })
    }


    componentDidMount(){
        const id = window.localStorage.Token_Id;
        const token = window.localStorage.Authorization;
        UserServices.getUserStats(id, token)
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then(resJson => {
            this.setState({
                data: resJson
            })
        })
        .catch(err => {
            alert('something went wrong on our end. please excuse the technical difficulty; ' + err)
        });


        UserServices.getUserById(id, token)
        .then(res => {
            if(res.ok)
            return res.json();
        })
        .then(resJson => {
            this.setState({
                username: resJson.username
            });
        })
        .catch(err => {
            alert('we are experiencing technical difficulties. Please stand by or try again later; ' + err)
        })
    
    }
        dateMath = () =>{
            if(this.state.data.length > 0){
                const {data} = this.state
                const practiceEntries = data.map(entries => {
                    return {
                        title: entries.title,
                        composer: entries.composer,
                        date: moment(entries.practice_date)
                    }
                })
                const dates = practiceEntries.map(entries => moment(entries.practice_date))
                const mostRecentDate = moment.max(dates).format("MM/DD/YYYY h:mm:ss a");
                return practiceEntries.find(practiceEntry => practiceEntry.date === mostRecentDate)
            }
        }
        mostRecentPractice = () => {
            if(this.state.data.length > 0){
                const {data} = this.state;
                const dates = data.map(entry => moment(entry.practice_date))
                if(dates[0]._d === 'Invalid Date'){
                    return 'There are no practice hours logged yet'
                } else{
                    const datesCleaned = []
                    for(let i = 0; i < dates.length; i++){
                        if(!isNaN(dates[i]._i)){
                            datesCleaned.push(dates[i])
                        }
                        
                    }
                    return (
                        `Your most recent rehearsal was on ` + 
                     moment.max(datesCleaned).format("MM/DD/YYYY h:mm:ss a")
                    )       
                }
                     
            }
        }

    render(){
        let totalHours = 0;
        if(this.state.data.length !== null){
            for(let i = 0; i < this.state.data.length; i++){
                totalHours += this.state.data[i].practice_hours
            }
        }
        
        return(
            <>
            <main className="Stats">
                <h2>Welcome <span id="username">{this.state.username}</span>!</h2>
                <div>
                    <h2>Your Practice Trends</h2>
                    <p>{this.mostRecentPractice()} </p>
                    <p>You have logged a total of {totalHours} hours of practice time</p>
                    <p>You have averaged a practice time of {(totalHours / this.state.data.length) * 60 || 0} minutes per day</p>
                    <div className="linksToExplore">
                        <Link to="/SongList">See your songs</Link><br/>
                        <Link to="/AddSong">Add a new song</Link><br/>
                        <Link to="/AddHours">Log Practice Hours</Link><br/>
                    </div>
                    
                </div>
            </main>
                
            </>
            
        )
    }
}