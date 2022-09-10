import React from "react";
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css';

export default function Header() {
    return ( 
        <div className="header">
            <div class="header--logo">
                <h1 className="header--title">GetStuffDone</h1>
                <FontAwesomeIcon icon={faTasks} className='header--icon'></FontAwesomeIcon>
            </div>
        </div>
    )
}