import React from "react";
import PropTypes from "prop-types"

function WeatherTable(props){
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">pogoda</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>temperatura</td>
                        <td>{props.temp}</td>
                    </tr>
                    <tr>
                        <td>wilgotność</td>
                        <td>{props.humidity}</td>
                    </tr>
                    <tr>
                        <td>ciśnienie</td>
                        <td>{props.pressure}</td>
                    </tr>
                    <tr>
                        <td>widoczność</td>
                        <td>{props.visibility}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

WeatherTable.propTypes = {
    temp: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    visibility: PropTypes.number.isRequired
}

export default WeatherTable