import React, {Component} from "react"
import {Route, Link} from "react-router-dom"
import CityForm from "./CityForm"

class App extends Component{
    constructor(){
        super();
        console.log("constructor")
        this.state = {
            api: {
                adress: "api.openweathermap.org/data/2.5/weather",
                key: "2619c60137cdebc87f7ddd45afbf7101",
                call: "",
                getFlag: false,
                error: null,
                isLoaded: false,
                items: null
            },
            posGet: false,
            latitude: '',
            longitude: '',
            city: '',
            
        }
        if(this.state.posGet === false){
            this.onGetCurrentPosition();
        }
        if(this.state.posGet === false){

        }
        this.onGetCurrentPosition = this.onGetCurrentPosition.bind(this);
        this.onShowWeather = this.onShowWeather.bind(this);
        
        
    }

    componentDidMount(){
        if(this.state.api.getFlag === true){
            fetch(this.state.api.call)
                .then(res => res.json())
                .then((result) => {
                    this.setState(state =>{
                        state.api = {
                            ...state.api,
                            isLoaded: true,
                            items: result
                        }
                    });
                }, (error) => {
                    this.setState(state => {
                        state.api = {
                            ...state.api,
                            error: error,
                            isLoaded: false
                        }
                    })
                }
            )
        }
    }

    //getting position from Geolocation API
    onGetCurrentPosition(){
        var geo = navigator.geolocation;
        geo.getCurrentPosition((position) => {
            this.setState({
                posGet: true,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
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
        console.log(this.state)
    }

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
        
        apiCall += "&APPID=";
        apiCall += this.state.api.key;
        console.log(apiCall);
        this.setState(state => {
            state.api = {
                ...state.api,
                call: apiCall,
                getFlag: true
            }
        })
    }


    render(){
        console.log("render");
        console.log(this.state);
        return(
            <div>
                <h1>simple weather app</h1>
                <Route exact path="/" render={() => (
                    <div>
                        <CityForm onChangeCityForm={this.onChangeCityForm}/>
                        <Link to="ShowWeather" onClick={this.onShowWeather}>show weather</Link>
                    </div>
                )}/>
                <Route path="/ShowWeather" render={() => {
                    if(this.state.api.error){
                        return (
                            <div>
                                <p>error</p>
                            </div>
                        )
                    } else {
                        console.log(this.state.api);
                        return(
                            <div>
                                <p>ok</p>
                            </div>
                        )
                    }
                }
                    
                }/>
            </div>
        )
    }
}

export default App