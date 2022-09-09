import {React, useState} from "react";
import "./Task.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Task(props) {
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState(
        {
            title: props.task.title,
            priority: props.task.priority,
            time: props.task.time,
            dueDate: props.task.dueDate,
        }
    ) 

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(event) {
        event.preventDefault()
        let newTask = {
            ...formData,
            id: props.task.id
        }

        let tasks = props.taskLibrary[props.listKey];
        let idArray = tasks.map((task) => task.id);
        let updatedTasks = Array.from(tasks);
        let index = idArray.indexOf(props.task.id);

        updatedTasks[index] = newTask;

        props.setTaskLibrary((oldTaskLibrary) => {
            let newValue = {
                ...oldTaskLibrary,
                [props.listKey]: updatedTasks
            }
            console.log(newValue)
            let save = JSON.stringify(newValue);
            localStorage.setItem("savedTaskLibrary", save);
            return newValue
        });

    }

    return (
        <>  
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <form>
                    <input
                        type="text"
                        placeholder="Title"
                        onChange={handleChange}
                        name="title"
                        value={formData.title}
                    />
                    <input
                        type="text"
                        placeholder="Priority"
                        onChange={handleChange}
                        name="priority"
                        value={formData.priority}
                    />
                    <input
                        type="text"
                        placeholder="Time"
                        onChange={handleChange}
                        name="time"
                        value={formData.time}
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" >Save</Button>
            </Modal.Footer>
        </Modal>
            <h1 className="task--title">{props.task.title}</h1>
            <p>{props.task.time}</p>
            <button className="delete-btn" id={props.id} onClick={() => props.removeTask(props.id)}>Delete</button>
            <button className="edit-btn" id={props.id}  onClick={handleShow}>Edit</button>


        </>
    )
}

