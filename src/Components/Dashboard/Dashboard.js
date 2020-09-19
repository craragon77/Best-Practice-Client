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

    
    render(){
        const dateMath = this.state.data.map((i) => {
            return console.log(Date(i.start_time))
        })
        //idk how to manipulate the date :(
        return(
            <>
            <main className="Stats">
                <h1>Welcome {this.state.username}!</h1>
                <div>
                    {dateMath}
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