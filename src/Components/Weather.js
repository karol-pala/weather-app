import React, {Component} from "react";
import City from "./City"
import WeatherTable from "./WeatherTable"
import TimeTable from './TimeTable'

class Weather extends Component{
    constructor(){
        super();
        let weather = localStorage.getItem("weather-state");
        if(weather){
            let parsedWeather = JSON.parse(weather);
            this.state = {
                ...this.props,
                call: null,
                items: parsedWeather,
                errors: null,
                flag: true
            }
        } else {
            this.state = {
                ...this.props,
                call: null,
                items: null,
                error: null,
                flag: false
            }
        }
    }
    componentWillMount(){
        if(this.props.call){
            this.setState({
                call: this.props.call
            })
        }
    }
    componentDidMount(){
        if(this.props.callFlag){
            fetch(this.state.call)
                .then(res => {
                    if(res.ok){
                        return res.json()
                    } else {
                        throw new Error("something went wrong");
                    }
                })
                .then((result) => {
                    let item = result;
                    return item;
                }).then(i => {
                    this.setState({
                        items: i,
                        flag: true
                    })
                }).then(i => {
                    let json = this.state.items;
                    json = JSON.stringify(json);
                    localStorage.setItem("weather-state", json);
                }).catch(error => this.setState({error: error}))
        }
    }
    // componentDidUpdate(){
    //     var weather = this.state.items;
    //     weather = JSON.stringify(weather);
    //     localStorage.setItem("weather", weather);
    // }
    render(){
        console.log(this.state.items)
        console.log(this.state.flag)
        if(this.state.flag === true){
            return(
                <div>
                    <City   city={this.state.items.name} 
                            lat={this.state.items.coord.lat}
                            lon={this.state.items.coord.lon}/>
                    <WeatherTable   humidity={this.state.items.main.humidity}
                                    pressure={this.state.items.main.pressure}
                                    temp={this.state.items.main.temp}
                                    visibility={this.state.items.visibility}/>
                    <TimeTable  sunrise={this.state.items.sys.sunrise}
                                sunset={this.state.items.sys.sunset}/>
                    
                </div>
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

export default Weather