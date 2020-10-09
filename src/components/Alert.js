import React from "react";

const Alert = ({status, message}) => {
    return (
        <div className={`notification ${status}`}>{message}</div>
    )
}

export default Alert;