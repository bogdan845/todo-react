import React from "react";

const Notification = ({status, text}) => {
    return (
        <div className={`notification status-${status}`}>{text}</div>
    )
}

export default Notification;