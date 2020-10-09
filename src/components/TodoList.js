import React from "react";

import Item from "./Item";

const TodoList = ({list, handleEdit, handleRemove, handleClearList, handleCompleted}) => {


    return (
        <>
            <div className="todos">
                {list.map(item => {
                    return (
                        <Item
                            key={item.id}
                            data={item}
                            handleEdit={handleEdit}
                            handleRemove={handleRemove}
                            handleCompleted={handleCompleted}
                        />
                    )
                })}
            </div>
            {list.length > 0 && <button className="btn-clear" onClick={handleClearList}>Clear list</button> }
        </>
    )
}

export default TodoList;