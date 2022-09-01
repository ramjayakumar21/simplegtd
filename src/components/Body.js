import React, { useState } from "react";
import "./Body.css"
import TaskList from './TaskList.js'
import Navbar from "./Navbar.js"



export function Body() {
    return (
            <div className="body">
                <Navbar />
                <TaskList listname="High" />
                <TaskList listname="Medium" />
            </div>
    )
}





