import React from "react"

function TimeTable(props){
    console.log(props.sunset)
    var sunset = props.sunset;
    console.log(sunset.toString())
    sunset = new Date(sunset);
    console.log(sunset.toString());
    return(
        <div>

        </div>
    )
}

export default TimeTable