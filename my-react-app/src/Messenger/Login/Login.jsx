import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyle.css';

export default function Login({onLogin}) {
    const [isRegistred, setIsRegistred] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginData.email === "123@mai.ru" && loginData.password === "123") {
            onLogin();
            navigate('/app');
        } else {
            alert("Invalid email or password");
        }
    };

    const handleRegSubmit = (e) => {
        e.preventDefault();
        alert("Success");
        setIsRegistred(false);
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