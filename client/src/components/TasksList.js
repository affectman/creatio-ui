import React from 'react'
import {Link} from 'react-router-dom'

export const TasksList = ({ tasks }) => {
    if (!tasks.length) {
        return <p className="center">Ссылок пока нет</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Заголовок</th>
                <th>Описание</th>
                <th>Открыть</th>
            </tr>
            </thead>

            <tbody>
            { tasks.map((task, index) => {
                return (
                    <tr key={task._id}>
                        <td>{index + 1}</td>
                        <td>{task.title}</td>
                        <td>{task.text}</td>
                        <td>
                            <Link to={`/detail/${task._id}`}>Открыть</Link>
                        </td>
                    </tr>
                )
            }) }
            </tbody>
        </table>
    )
}