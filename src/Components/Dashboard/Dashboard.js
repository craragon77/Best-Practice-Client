import React, {Component} from 'react';
import UserServices from '../../Services/UserServices';
import TokenService from '../../Services/TokenService';
import "./Dashboard.css"


export default class Dashboard extends Component{
    componentDidMount(){
        const id = window.localStorage.Token_Id
        UserServices.getUserStats(id)
        .then(res => {
            console.log(res.json)
        })
        .catch(console.error('something went wrong, panic!'))
    }
    render(){
        //which stats do I want to keep track of?
        //
        return(
            <>
            <main className="Stats">
                <h1>Welcome Chris!</h1>
                <div>
                    <h2>Your Practice Trends</h2>
                    <p>You have practiced 9 days in a row</p>
                    <p>You have logged a total of 93.5 hours of practice time</p>
                    <p>Your most rehersed song is Lagrimas by Francisco Tarrega</p>
                    <p>You have practiced 7.5 hours total this week</p>
                    <p>You have averaved a practice time of 20 minutes per day</p>
                </div>
            </main>
                
            </>
            
        )
    }
}