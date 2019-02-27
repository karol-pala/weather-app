import React, {Component} from "react"
import {Route, Link} from "react-router-dom"
import CityForm from "./CityForm"
import Weather from "./Weather"
import Coords from "./Coords"
import CityFlagButton from "./CityFlagButton"

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
                address: "https://api.openweathermap.org/data/2.5/weather",
                apikey: "2619c60137cdebc87f7ddd45afbf7101",
                units: "metric",
                call: "",
                callFlag: false,
                positionFlag: false,
                cityFlag: false,
                latitude: '',
                longitude: '',
                city: '',
            }
        }
    
        this.onGetCurrentPosition = this.onGetCurrentPosition.bind(this);
        this.onShowWeather = this.onShowWeather.bind(this);
        this.setToLocalStorage = this.setToLocalStorage.bind(this);
        
    }

    componentDidMount(){
        if(!this.state.positionFlag){
            this.onGetCurrentPosition();
        }
        this.setToLocalStorage();
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
                cityFlag: false,
                positionFlag: true,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            console.log(this.state)
        },() => {
            this.setState({
                positionFlag: true
            })
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
        var apiCall = `${this.state.address}`;
        if(!this.state.cityFlag){
            apiCall += `?lat=${this.state.latitude}&lon=${this.state.longitude}`;
        } else {
            apiCall += `?q=${this.state.city}`;
        }
        apiCall += `&units=${this.state.units}&APPID=${this.state.apikey}`;
        console.log(apiCall);
        this.setState({
            call: apiCall,
            callFlag: true
        })
    }

    onChangePosFlag = (e) => {
        e.preventDefault();
        if(this.state.positionFlag){
            this.setState({
                cityFlag: true
            })
        } else {
            this.setState({
                cityFlag: true
            })
        }
        console.log(this.state.positionFlag)
    }


    render(){
        if(!this.state.positionFlag){
            return(
                <div className="wait-screen">
                    <p>czekaj</p>
                </div>
            )
        } else {
            return(
                <div className="main-screen">
                    <h1>simple<br/>weather<br/>app</h1>
                    <Route exact path="/" render={() => (
                        <div className="choose-city">
                            <Coords text="lokalizacja" lat={this.state.latitude} lon={this.state.longitude}/>
                            <CityForm onChangeCityForm={this.onChangeCityForm}/>
                            <CityFlagButton onClick={this.onChangePosFlag}/>
                            <Link className="show-weather" to="ShowWeather" onClick={this.onShowWeather}>pokaż</Link>
                        </div>
                    )}/>
                    <Route path="/ShowWeather" render={() => (    
                        <Weather    call={this.state.call} 
                                    callFlag={this.state.callFlag}
                                    />
                    )}/>
                </div>
            )
        }
                
    }
}

export default App