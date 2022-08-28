import React, { useState, useRef }  from "react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Task from "./Task.js"
import "./TaskList.css"

export default function TaskList(props) {
    const inputTextRef = useRef(null);
    const inputPriorityRef = useRef(null);

    let taskFactory = (name, priority) => {
        let id = `${name}+${Date.now()}`;
        return {name, priority, id}
    }

    if (storageAvailable('localStorage')) {
        // let taskList = localStorage.getItem(taskArray, taskList)
    }
    else {
        
    }

    let taskList = {
        tasksArray: [
            taskFactory('task 1', 'high'),
            taskFactory('task 2', 'low'),
        ],
    }

    
    function removeTask(id) {
        let idArray = tasks.map((task) => task.id);
        let oldTasks = Array.from(tasks);
        let index = idArray.indexOf(id);

        if (index > -1) { // only splice array when item is found
            oldTasks.splice(index, 1); // 2nd parameter means remove one item only
        }
        updateTasks(oldTasks);
    }
    


    function addTask() {
        let name = inputTextRef.current.value;
        let priority = inputPriorityRef.current.value;
        let oldTasks = Array.from(tasks);
        oldTasks.push(taskFactory(name, priority))
        updateTasks(oldTasks)
        // localStorage.setItem(taskArray, oldTasks);
    }
   
    const [tasks, updateTasks] = useState(taskList.tasksArray);

    let tasksList = tasks.map(({...task}, index) => {
        return ( 
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => 
                <li className="task-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Task id={task.id} name={task.name} priority={task.priority} />
                        <button id="delete-btn" className={task.id} onClick={() => removeTask(task.id)}>Delete</button>               
                </li>}
        </Draggable>
        )
    })


    function handleOnDragEnd(result) {
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateTasks(items);
    }

    function handleEnterDown(event) {
        if ("Enter" === event.key) {
            addTask();
        }
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="task-list" >
                {(provided) =>
                    <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps} >
                        {tasksList}
                        {provided.placeholder}
                    </ul>}
            </Droppable>
            </DragDropContext>
            <input onKeyDown={handleEnterDown} ref={inputTextRef}></input>
            <select ref={inputPriorityRef}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
        </div>
    )
}

// COPIED FROM MDN DOCS
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
  }
  
 