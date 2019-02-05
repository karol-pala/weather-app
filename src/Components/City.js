import React from "react"

function City(props){
    return(
        <div>
            <h2>{props.city}</h2>
            <h3>{props.lat}</h3>
            <h3>{props.lon}</h3>
        </div>
    )
}

export default City