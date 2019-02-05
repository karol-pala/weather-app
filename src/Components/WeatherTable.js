import React from "react";

function WeatherTable(props){
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">weather</th>
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

export default WeatherTable