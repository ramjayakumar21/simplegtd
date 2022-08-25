import React from "react";
import "./Body.css"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

let tasks = [
    {
        id: '1',
        name: 'task 1',
        priority: 'high',
    },
    {
        id: '2',
        name: 'task 2',
        priority: 'low',
    }
];



export default function Body() {
    let tasksList = tasks.map(({...task}, index) => {
        return ( 
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => 
                <li className="task" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <h1>{task.name}</h1>
                    <p>{task.priority}</p>
                </li>}
        </Draggable>
        )
    })


    return (
        <div>
            <h1>Current tasks</h1>
            <input id='addtasks'></input>
            <button id='btn'>Add task</button>
            <DragDropContext>
                <Droppable droppableId="task-list" >
                    {(provided) => 
                        <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps} >
                            {tasksList}
                        </ul>
                    }
                </Droppable>
            </DragDropContext>
        </div>
    )
}



