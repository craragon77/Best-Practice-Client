import React, {Component} from 'react';
import UserServices from '../../Services/UserServices';
import TokenService from '../../Services/TokenService';
import config from '../../config';
import "./Dashboard.css"


export default class Dashboard extends Component{
    componentDidMount(){
        const id = window.localStorage.Token_Id
        const token = window.localStorage.Authorization
        console.log(token)
        //^^^this shows the token
        UserServices.getUserStats(id, token)
        .then(res => {
            if(res.ok){
                console.log(res.json())
                return res.json()
            }
            //response lacks data :(
        })
        .then(res => {
            //i also used to have this as resJson but it was undefined :( #PromiseHandlingIsHard
            console.dir(res)
        })
        .catch(err => {
            console.log('panic')
        })
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