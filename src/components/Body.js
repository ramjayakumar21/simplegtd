import "./Body.css"

import TaskList from './TaskList.js'




export default function Body() {
    return (
        <div>
            <h1>Current tasks</h1>
            <div className="body">
                <TaskList />
                <TaskList />
            </div>
        </div>
    )
}



