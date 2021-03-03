import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    const [form, setForm] = useState({
        title: '',
        text: '',
        time: ''
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/task/creating', 'POST', {...form}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.task._id}`)
            } catch (e) {}
        }
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Введите заголовок"
                        id="title"
                        type="text"
                        name= "title"
                        onKeyPress={pressHandler}
                        onChange={changeHandler}
                    />
                    <label htmlFor="title">Заголовок</label>
                </div>
                <div className="input-field">
                    <input
                        placeholder="Введите описание"
                        id="text"
                        name= "text"
                        type="text"
                        onChange={changeHandler}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="text">Описание задания</label>
                </div>
                <div className="input-field">
                    <input
                        placeholder="Время на задачу"
                        id="time"
                        type="number"
                        name= "time"
                        onChange={changeHandler}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="time">Время на задачу</label>
                </div>
            </div>
        </div>
    )
}