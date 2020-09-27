import React, {Component} from 'react';
import UserServices from '../../Services/UserServices';
import TokenService from '../../Services/TokenService';
import config from '../../config';
import moment from 'moment';
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
            console.log(resJson)
            //i also used to have this as resJson but it was undefined :( #PromiseHandlingIsHard
            this.setState({
                data: resJson
            })
            //console.log(this.state.data)
        })
        .catch(err => {
            alert('something went wrong on our end. please excuse the technical difficulty')
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
            alert('something went wrong on our end. please excuse the technical difficulty')
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
                //this.setState({
                    //mostRecentId: 
                //})
                const mostRecentDate = moment.max(dates);
                console.log(practiceEntries.find(practiceEntry => practiceEntry.date === mostRecentDate)
                )
                return practiceEntries.find(practiceEntry => practiceEntry.date === mostRecentDate)

                //let closestDay = this.state.data[0].practice_date
                /*for(let i = 0; i < this.state.data.length; i++){
                    if(closestDay <  [i].practice_date){
                        console.log('the date changed!')
                        closestDay = this.state.data[i]
                    } 
                    console.log(closestDay)
                    return moment(closestDay).format("MM/DD/YYYY h:mm:ss a")
                } */

                //this is the worst thing thats ever happened to me
                //console.log('the closest date to today is ' + closestDay)
            }
        }
        /*utilityData = () => {
            if(this.state.data.length > 0){
                const {data} = this.state
                const mostRecent = data.map(entires => console.log(entires.practice_date, entires.id))
                

        } */
    
    
    
    render(){
        let totalHours = 0;
        if(this.state.data.length !== null){
            for(let i = 0; i < this.state.data.length; i++){
                totalHours += this.state.data[i].practice_hours
            }
        }
        //const utilityData = this.utilityData()
        
        return(
            <>
            <main className="Stats">
                <h1>Welcome {this.state.username}!</h1>
                <div>
                    {this.mostRecentPractice}
                    <h2>Your Practice Trends</h2>
                    {/*<p>You have practiced 9 days in a row</p> */}
                    <p>Your most recent rehearsal was on {this.dateMath()} </p>
                    <p>You have logged a total of {totalHours} hours of practice time</p>
                    <p>Your most rehearsed song is Lagrimas by Francisco Tarrega</p>
                    {/*<p>You have practiced 7.5 hours total this week</p> */}
                    <p>You have averaged a practice time of {(totalHours / this.state.data.length) * 60} minutes per day</p>
                </div>
            </main>
                
            </>
            
        )
    }
}