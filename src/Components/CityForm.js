import React from "react";
import PropTypes from "prop-types"

function CityForm(props){
    return(
        <article className="city-form">
            <h2>wpisz miasto</h2>
            <form>
                <label htmlFor="city">miasto</label>
                <input name="city" onChange={props.onChangeCityForm}/>
            </form>
        </article>
    )
}

CityForm.propTypes = {
    onChangeCityForm: PropTypes.func.isRequired
}        

export default CityForm