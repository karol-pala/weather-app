import React, {Component} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Coords from "./Coords"
import WeatherTable from "./WeatherTable"
import TimeTable from './TimeTable'

class Weather extends Component{
    constructor(props){
        super(props);
        this.state = {
            call: null,
            items: null,
            error: null,
            flag: false
        }
        
    }
    componentDidMount(){
        let wAppStorage = this.fromLocalStorage("weather-app");
        console.log(wAppStorage);
        if(wAppStorage !== null && wAppStorage !== "undefined"){
            this.setState({
                items: this.fromLocalStorage("weather-app"),
                flag: true
            })
        } else {
            axios.get(this.props.call).then(res => {
                this.setState({
                    items: res,
                    flag: true
                })
                this.toLocalStorage("weather-app", this.state.items);
            }).catch(error => {
                console.error(error)
            })
        }
        this.toLocalStorage("weather-app-call", this.props.call)
    }

    componentWillUnmount(){
        localStorage.removeItem("weather-app");
    }

    fromLocalStorage = (key) => {
        let item = localStorage.getItem(key);
        let parsedItem = JSON.parse(item);
        return parsedItem;
    }

    toLocalStorage = (key, value) => {
        let json = value;
        json = JSON.stringify(json);
        localStorage.setItem(key, json);
    }

    render(){
        console.log(this.state.items)
        console.log(this.state.flag)
        if(this.state.flag === true){
            return(
                <section>
                    <Coords   text={this.state.items.data.name} 
                            lat={this.state.items.data.coord.lat}
                            lon={this.state.items.data.coord.lon}/>
                    <WeatherTable   humidity={this.state.items.data.main.humidity}
                                    pressure={this.state.items.data.main.pressure}
                                    temp={this.state.items.data.main.temp}
                                    visibility={this.state.items.data.visibility}/>
                    <TimeTable  sunrise={this.state.items.data.sys.sunrise}
                                sunset={this.state.items.data.sys.sunset}/>
                    
                </section>
            )
        } else {
            return(
                <div>
                    <p>loading...</p>
                </div>
            )
        }
        
        
    }
}

Weather.propTypes = {
    call: PropTypes.string.isRequired,
    callFlag: PropTypes.bool.isRequired
}

export default Weather