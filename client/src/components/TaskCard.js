import React from 'react'

export const TaskCard = ({ task }) => {
    return (
        <>
            <h2>Таска</h2>

            <p>Заголовок: {task.title}</p>
            <p>Описание: {task.text}</p>
            <p>Время на выполнение задачи: <strong>{task.time}</strong></p>
            <p>Дата создания: <strong>{new Date(task.date).toLocaleDateString()}</strong></p>
        </>
    )
}