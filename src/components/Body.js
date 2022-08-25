import React from "react";

export default function Body() {
    return (
        <div>
            <h1>Current tasks</h1>
            <input id='addtasks'></input>
            <button id='btn'>Add task</button>
            <div id="array"></div>
        </div>
    )
}

let tasks = ['test'];

let b = document.getElementById('btn');

b.addEventListener('click', () => {
    displayArray();
})


function displayArray() {
    tasks.forEach(task => {
        let t = document.createElement('h1');
        t.textContent = task;
        document.getElementsById('array').appendChild(t);
    })
}