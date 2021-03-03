import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <span className="brand-logo">Блокнот</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to={"/create"}>Создать задачу</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/tasks"}>Список задач</NavLink>
                    </li>
                    <li>
                        <a href= "/" onClick={logoutHandler} >Выход из системы</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}