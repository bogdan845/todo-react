import React from "react";

import {FaPencilAlt, FaTrashAlt} from "react-icons/fa"


const Item = ({data, handleEdit, handleRemove, handleCompleted}) => {

    const {todo, id, isCompleted} = data;


    return (
        <div className={isCompleted ? "todos__item completed" : "todos__item"}>

            <input
                type="checkbox"
                checked={isCompleted ? true : ""}
                onChange={ () => handleCompleted(id)}
            />
            <span className={isCompleted ? "todos__text completed" : "todos__text"}>{todo}</span>

            <div className="todos__item-btns">
                <button className="todos__btn todos__btn-edit" onClick={() => handleEdit(id)}><FaPencilAlt/></button>
                <button className="todos__btn todos__btn-remove" onClick={() => handleRemove(id)}><FaTrashAlt/></button>
            </div>
        </div>
    )
}

export default Item;