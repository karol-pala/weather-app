import React, {Component} from "react"
import {Route, Link} from "react-router-dom"
import CityForm from "./CityForm"
import Weather from "./Weather"

class App extends Component{
    constructor(){
        super();
        console.log("constructor")
        var json = localStorage.getItem("app-state");
        if(json){
            let parsedJson = JSON.parse(json);
            this.state = parsedJson;
        } else {
            this.state = {
                api: {
                    adress: "https://api.openweathermap.org/data/2.5/weather",
                    key: "2619c60137cdebc87f7ddd45afbf7101",
                    units: "metric",
                    call: "",
                    callFlag: false
                },
                positionFlag: false,
                latitude: '',
                longitude: '',
                city: '',
            }
        }
        
        if(this.state.positionFlag === false){
            this.onGetCurrentPosition();
        }
        this.setToLocalStorage();

        this.onGetCurrentPosition = this.onGetCurrentPosition.bind(this);
        this.onShowWeather = this.onShowWeather.bind(this);
        this.setToLocalStorage = this.setToLocalStorage.bind(this);
        
    }

    setToLocalStorage(){
        var data = this.state;
        data = JSON.stringify(data);
        localStorage.setItem("app-state", data);
    }

    //getting position from Geolocation API
    onGetCurrentPosition(){
        var geo = navigator.geolocation;
        geo.getCurrentPosition((position) => {
            this.setState({
                positionFlag: true,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            console.log(this.state)
        },() => {
            console.error("Localization through Geolocation API failed");
        });
    }

    //getting position from city form
    onChangeCityForm = (e) => {
        e.preventDefault();
        this.setState({
            city: e.target.value
        });
    }

    //show weather - gets args from state and add them to apiCall
    onShowWeather(){
        var apiCall = "";
        apiCall += this.state.api.adress;
        if(this.state.latitude && this.state.longitude){
            apiCall += "?lat=";
            apiCall += this.state.latitude;
            apiCall += "&lon=";
            apiCall += this.state.longitude;
        } else {
            apiCall += "?q=";
            apiCall += this.state.city;
        }
        apiCall += "&units=";
        apiCall += this.state.api.units;
        apiCall += "&APPID=";
        apiCall += this.state.api.key;
        console.log(apiCall);
        this.setState({
            api: {
                call: apiCall,
                callFlag: true
            }
        })
    }


    render(){
        return(
            <div>
                <h1>simple weather app</h1>
                <Route exact path="/" render={() => (
                    <div>
                        <CityForm onChangeCityForm={this.onChangeCityForm}/>
                        <Link to="ShowWeather" onClick={this.onShowWeather}>show weather</Link>
                    </div>
                )}/>
                <Route path="/ShowWeather" render={() => (    
                    <Weather call={this.state.api.call} callFlag={this.state.api.callFlag}/>
                )}/>
            </div>
        )
    }
}

export default App