import React from "react";

import {FaPlus, FaPencilAlt} from "react-icons/fa"

const UI = ({todo, handleOnChange, handleAddItem, edit}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const date = new Date();
    // day names
    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    // get current day name
    let getDay = dayNames[date.getDay()];

    let getDate = date.getDate();
    getDate = getDate < 10 ? "0" + getDate :getDate;

    // adding "1" because January = 0
    let getMonth = date.getMonth() + 1;
    getMonth = getMonth < 10 ? "0" + getMonth : getMonth;

    let getYear = date.getFullYear();


    return (
        <>
            <div className="date">
                <h3 className="date__day">{getDay}</h3>
                <h4 className="date__full-date">{`${getDate}-${getMonth}-${getYear}`}</h4>
            </div>

            <form className="form" onSubmit={handleSubmit}>
                <div className="form__group">
                    <input
                        id="todo"
                        type="text"
                        value={todo}
                        placeholder="Add todo"
                        onChange={handleOnChange}
                    />
                    <label htmlFor="todo">Add todo</label>
                </div>

                <button type="submit"
                        className="form__submit"
                        onClick={handleAddItem}
                >
                    {edit.isEdit ? <FaPencilAlt/> : <FaPlus/>}
                </button>
            </form>
        </>
    )
}

export default UI;