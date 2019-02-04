import React from "react";

function CityForm(props){
    return(
        <div>
            <h2>choose city</h2>
            <form>
                <label htmlFor="city">city</label>
                <input name="city" onChange={props.onChangeCityForm}/>
            </form>
        </div>
    )
}

export default CityForm