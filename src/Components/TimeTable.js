import React from "react"
import PropTypes from "prop-types"

function TimeTable(props){
    let sunrise = props.sunrise * 1000;
    let sunset = props.sunset * 1000;
    sunset = new Date(sunset);
    sunrise = new Date(sunrise);
    sunset = sunset.toLocaleTimeString();
    sunrise = sunrise.toLocaleTimeString();
    console.log(sunset.toString());
    return(
        <article>
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
        </article>
    )
}

TimeTable.propTypes = {
    sunrise: PropTypes.number.isRequired,
    sunset: PropTypes.number.isRequired
}

export default TimeTable