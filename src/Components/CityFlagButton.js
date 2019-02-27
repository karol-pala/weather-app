import React from "react"
import PropTypes from "prop-types"

function CityFlagButton(props){
    return(
        <div className="city-flag">
            <button onClick={(e)=>props.onClick(e)}>użyj miasta</button>
        </div>
    )
}

CityFlagButton.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default CityFlagButton