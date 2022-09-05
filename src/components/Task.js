import React from "react";
import "./Task.css";

var currentDate = new Date();
let tomorrowDate = new Date(currentDate.setDate(currentDate.getDate() + 1));

export function Task(props) {
    return (
        <div>
            <h1 className="task--title">{props.title}</h1>
            <p>{props.priority}</p>
            <p>{props.time}</p>
        </div>
    )
}


export function taskFactory(title, priority, time = "30 Mins", notes = "Add notes here", dueDate = null, checklist = []) {
    let id = `${title}${Date.now()}`;
    
    let modifyTask = function(title, priority, time, notes, dueDate, checklist) {
        return taskFactory()
    }

    return {id, title, priority, time, notes, dueDate, checklist}
}

export function TaskEditor(props) {

}