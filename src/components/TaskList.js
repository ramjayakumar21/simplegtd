import React, { useRef }  from "react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Task} from "./Task.js"
import "./TaskList.css"


export default function TaskList(props) {
    const { listname, listKey, taskLibrary, setTaskLibrary } = props;
    let tasks = taskLibrary[listKey];

    const inputTextRef = useRef(null);
    const overlayRef = useRef(null);

    function taskFactory(title, priority, time = "30 Mins", dueDate = null) {
        let id = `${title}${Date.now()}`;
        
        return {id, title, priority, time, dueDate}
    }

    function removeTask(id) {
        let idArray = tasks.map((task) => task.id);
        let updatedTasks = Array.from(tasks);
        let index = idArray.indexOf(id);

        if (index > -1) { // only splice array when item is found
            updatedTasks.splice(index, 1); // 2nd parameter means remove one item only
        }

        console.log('remove')
        setTaskLibrary((oldTaskLibrary) => {
            let newValue = {
                ...oldTaskLibrary,
                [listKey]: updatedTasks
            }
            console.log(newValue)
            saveToStorage(newValue)
            return newValue
        });
        
    }
    
    


    function addTask() {
        let title = inputTextRef.current.value;
        inputTextRef.current.value = "";
        let updatedTasks = Array.from(tasks);
        updatedTasks.push(taskFactory(title, props.listname))
        setTaskLibrary((oldTaskLibrary) => {
            let newValue = {
                ...oldTaskLibrary,
                [listKey]: updatedTasks
            }
            console.log(newValue)
            saveToStorage(newValue)
            return newValue
        });
    }

    
    



    let tasksList = tasks.map(({...task}, index) => {
        return (
            <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) =>
                    <li className="task-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Task
                                id={task.id}
                                task={task}
                                removeTask={removeTask}
                                listKey={listKey}
                                taskLibrary={taskLibrary} 
                                setTaskLibrary={setTaskLibrary}
                            />
                    </li>}
            </Draggable>
        )
    })


    function handleOnDragEnd(result) {
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTaskLibrary((oldTaskLibrary) => {
            let newValue = {
                ...oldTaskLibrary,
                [listKey]: items
            }
            console.log(newValue)
            saveToStorage(newValue)
            return newValue
        });
    }

    function handleEnterDown(event) {
        if ("Enter" === event.key) {
            addTask()
            
        }
    }

    function saveToStorage(library) {
        let save = JSON.stringify(library);
        localStorage.setItem("savedTaskLibrary", save);
    }
 

    return (
        <>
        <div className="task-column">
            <h1>{listname}</h1>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="task-list" key={'task'}>
                    {(provided) => (
                        <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps} >
                            {tasksList}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <input onKeyDown={handleEnterDown} ref={inputTextRef} placeholder={`Add ${props.listname} priority task`}></input>
        </div>
        </>
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
  
  