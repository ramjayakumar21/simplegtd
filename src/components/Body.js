import React, { useState } from "react";
import { View } from "react-native";
import "./Body.css"
import TaskList from './TaskList.js'
import Modal from "react-native-modal";

export function Body() {
    const [isModalVisible, setModalVisible] = useState(false);


    return (
        <View>
            <Modal>
                <View style={{ flex: 1 }}>
                    <Text>I am the modal content!</Text>
                </View>
            </Modal>
            <div className="body">
                <TaskList listname="High" />
                <TaskList listname="Medium" />
            </div>
        </View>
    )
}

export function editTask(id) {
    let body = document.getElementById('task-column');
    body.classList.add("active");
}



