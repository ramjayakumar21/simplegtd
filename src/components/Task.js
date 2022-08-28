import React from "react";

export default function Task(props) {
    return (
        <div>
            <h1>{props.name}</h1>
            <p>{props.priority}</p>
        </div>
    )
}