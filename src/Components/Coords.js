import React from "react"
import PropTypes from "prop-types"

function Coords(props){
    var latitude = Number(props.lat);
    var longitude = Number(props.lon);
    latitude = latitude.toFixed(3);
    longitude = longitude.toFixed(3);
    return(
        <div className="city-location">
            <h2>{props.text}</h2>
            <div>
                <p className="lat-lon">szerokość</p>
                <p className="lat-lon">{latitude}</p>
            </div>
            <div>
                <p className="lat-lon">wysokość</p>
                <p className="lat-lon">{longitude}</p>
            </div>
        </div>
    )
}

Coords.propTypes = {
    city: PropTypes.string,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
}

export default Coords