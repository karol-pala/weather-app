import React, {Component} from "react"
import {Route, Link} from "react-router-dom"
import CityForm from "./CityForm"
import Weather from "./Weather"
import Coords from "./Coords"
import CityFlagButton from "./CityFlagButton"

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component{
    constructor(){
        super();
        console.log("constructor");
        this.state = {
            address: "https://api.openweathermap.org/data/2.5/weather",
            apikey: API_KEY,
            units: "metric",
            call: "",
            callFlag: false,
            positionFlag: false,
            cityFlag: false,
            latitude: '',
            longitude: '',
            city: '',
        }
    
        this.onGetCurrentPosition = this.onGetCurrentPosition.bind(this);
        this.onShowWeather = this.onShowWeather.bind(this);
    }

    componentDidMount(){
        if(!this.state.positionFlag){
            this.onGetCurrentPosition();
        }
    }

    //getting position from Geolocation API
    onGetCurrentPosition(){
        const geo = navigator.geolocation;
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
        let apiCall = `${this.state.address}`;
        
        (!this.state.cityFlag) ? apiCall += `?lat=${this.state.latitude}&lon=${this.state.longitude}` : apiCall += `?q=${this.state.city}`;

        apiCall += `&units=${this.state.units}&APPID=${this.state.apikey}`;

        this.setState({
            call: apiCall,
            callFlag: true
        })
    }

    onChangePosFlag = (e) => {
        e.preventDefault();
        (this.state.cityFlag) ? this.setState({cityFlag: false}) : this.setState({cityFlag: true});
    }


    render(){
        if(!this.state.positionFlag){
            return(
                <section className="wait-screen">
                    <p>czekaj</p>
                </section>
            )
        } else {
            return(
                <section className="main-screen">
                    <h1>simple<br/>weather<br/>app</h1>
                    <Route exact path="/" render={() => (
                        <section className="choose-city">
                            <Coords text="lokalizacja" lat={this.state.latitude} lon={this.state.longitude}/>
                            <CityForm onChangeCityForm={this.onChangeCityForm}/>
                            <CityFlagButton onClick={this.onChangePosFlag}/>
                            <Link className="show-weather" to="ShowWeather" onClick={this.onShowWeather}>pokaż</Link>
                        </section>
                    )}/>
                    <Route path="/ShowWeather" render={() => (    
                        <Weather    call={this.state.call} 
                                    callFlag={this.state.callFlag}
                                    />
                    )}/>
                </section>
            )
        }
                
    }
}

export default App
