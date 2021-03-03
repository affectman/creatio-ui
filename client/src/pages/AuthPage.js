import React, {useEffect, useState, useContext} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";



export const AuthPage = () => {

    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const message = useMessage()
    const auth = useContext(AuthContext)

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message.call(data)

        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }


    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Вход в систему</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        {/*Надо добавить отдельные стили */}
                        <button className="btn yellow darken-2"
                                style={{marginRight: 10}}
                                onClick={loginHandler}
                                disabled={loading}
                        >Войти</button>
                        <button className="btn yellow darken-4"
                                onClick={registerHandler}
                                disabled={loading}
                        >Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}