import React from "react"
import PropTypes from "prop-types"

function TimeTable(props){
    var sunrise = props.sunrise * 1000;
    var sunset = props.sunset * 1000;
    sunset = new Date(sunset);
    sunrise = new Date(sunrise);
    sunset = sunset.toLocaleTimeString();
    sunrise = sunrise.toLocaleTimeString();
    console.log(sunset.toString());
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>wschód i zachód słońca</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>wschód</td>
                        <td>{sunrise}</td>
                    </tr>
                    <tr>
                        <td>zachód</td>
                        <td>{sunset}</td>
                    </tr>
                </tbody>
            </table> 
        </div>
    )
}

TimeTable.propTypes = {
    sunrise: PropTypes.number.isRequired,
    sunset: PropTypes.number.isRequired
}

export default TimeTable