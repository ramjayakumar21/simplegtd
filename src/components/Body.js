import React, { useState } from "react";
import "./Body.css"
import TaskList from './TaskList.js'
import Navbar from "./Navbar.js"

export function Body() { 

    let initialTaskLibrary;
    if (null != JSON.parse(localStorage.getItem(`savedTaskLibrary`))) {
        initialTaskLibrary = JSON.parse(localStorage.getItem(`savedTaskLibrary`)); 
    } else {
        initialTaskLibrary = 
        {   
            highPriority: 
                [
                    {id: "1", title: 'task 1', priority: 'High', time: "30-min", dueDate: null},
                    {id: "2", title: 'task 2', priority: 'High', time: "45-min", dueDate: null}
                ],
            medPriority:
                [
                ],
            lowPriority:
                [
                ],
        }
    }

    let [taskLibrary, setTaskLibrary] = useState(initialTaskLibrary);

    
    
    return (
            <div className="body">
                <Navbar />
                <TaskList listname="High" listKey="highPriority" taskLibrary={taskLibrary} setTaskLibrary={setTaskLibrary} />
                <TaskList listname="Medium" listKey="medPriority" taskLibrary={taskLibrary} setTaskLibrary={setTaskLibrary} />
                <TaskList listname="Low" listKey="lowPriority" taskLibrary={taskLibrary} setTaskLibrary={setTaskLibrary} />
            </div>
    )
}





