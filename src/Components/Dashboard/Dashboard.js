import React, {Component} from 'react';
import UserServices from '../../Services/UserServices';
import TokenService from '../../Services/TokenService';
import config from '../../config';
import "./Dashboard.css"


export default class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = ({
            username: '',
            data: []
        })
    }


    componentDidMount(){
        const id = window.localStorage.Token_Id;
        const token = window.localStorage.Authorization;
        console.log(token);
        //^^^this shows the token
        UserServices.getUserStats(id, token)
        .then(res => {
            if(res.ok){
                return res.json()
            }
            //response lacks data :(
        })
        .then(resJson => {
            //i also used to have this as resJson but it was undefined :( #PromiseHandlingIsHard
            this.setState({
                data: resJson
            })
            console.log(this.state.data)
        })
        .catch(err => {
            console.error(err)
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
            console.log(this.state.username)
        })
        .catch(err => {
            console.error(err);
        })
    }

    dateMath = () => {
        let today = new Date();
        //console.log(Date(today))
        let closestDay = this.state.data[0];
        for(let i = 0; i < this.state.data.length; i++){
            if(closestDay.date_practiced <=  i.date_practiced){
                closestDay = i.date_practiced
            } 
        }
        //this is the worst thing thats ever happened to me
        console.log(closestDay)
    }

    
    render(){
        let totalHours = 0;
        if(this.state.data.length !== null){
            for(let i = 0; i < this.state.data.length; i++){
                totalHours += this.state.data[i].practice_hours
            }
            //let closestDay = this.state.data[0];
        }
        //idk how to manipulate the date :(
        return(
            <>
            <main className="Stats">
                <h1>Welcome {this.state.username}!</h1>
                <div>
                    {this.dateMath}
                    <h2>Your Practice Trends</h2>
                    <p>You have practiced 9 days in a row</p>
        <p>Your most recent rehersal was on </p>
                    <p>You have logged a total of {totalHours} hours of practice time</p>
                    <p>Your most rehersed song is Lagrimas by Francisco Tarrega</p>
                    <p>You have practiced 7.5 hours total this week</p>
                    <p>You have averaged a practice time of {(totalHours / this.state.data.length) * 60} minutes per day</p>
                </div>
            </main>
                
            </>
            
        )
    }
}