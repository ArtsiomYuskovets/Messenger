import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyle.css';
import { loginUser, registerUser } from './api';

export default function Login({ onLogin }) {
    const [isRegistred, setIsRegistred] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(loginData);
            if (response.ok) {
                onLogin();
                navigate('/app');
            } else {
                alert("Неверные email или пароль");
            }
        } catch (error) {
            console.error("Ошибка при авторизации:", error);
        };
    }

    const handleRegSubmit = async (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }
        try{
        const response = await registerUser(loginData);
        alert("Регистрация успешна!");
        setIsRegistred(false);
        }
        catch(error){
            console.error("Ошибка регистрации:", error);
        }
        
    };

    return (
        <>
            <div className="loginContainer">
                <div className="loginForm">
                    <div className="loginHeader">
                        <button
                            className="changeButton"
                            onClick={() => setIsRegistred(false)}
                            disabled={!isRegistred}
                        >
                            Вход
                        </button>
                        <div className="space"></div>
                        <button
                            className="changeButton"
                            onClick={() => setIsRegistred(true)}
                            disabled={isRegistred}
                        >
                            Регистрация
                        </button>
                    </div>
                    <h1>{isRegistred ? 'Регистрация' : 'Вход'}</h1>
                    <div className="dataForm">
                        <div className={`formWrapper ${isRegistred ? 'show-register' : 'show-login'}`}>
                            <form onSubmit={handleLoginSubmit} className="form login-form">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                />
                                <button className="submitButton" type="submit">
                                    Войти
                                </button>
                            </form>
                            <form onSubmit={handleRegSubmit} className="form register-form">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={registerData.username}
                                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={registerData.confirmPassword}
                                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                />
                                <button className="submitButton" type="submit">
                                    Зарегистрироваться
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
