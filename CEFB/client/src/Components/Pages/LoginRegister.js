import "../CSSContents/LoginRegister.css";

import React, { useState, useEffect } from "react";
import axios from 'axios';


function LoginRegister() {

    //Saving the values in the form variable
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    //mode determines whether the form should disply login or register
    const [mode, setMode] = useState('login');
    const [errors, setErrors] = useState({});
    //message is used to disply any form of error to the user
    const [message, setMessage] = useState('');

    const [, setLoggedIn] = useState(false);

    //it updates the users values in case a change has been made 
    //used a spread operator to update the form by targeting .name and .value 
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const validateInfo = (form) => {
        let errors = {};
        if (!form.username) {
            errors.username = 'Username is required!';
        }
        if (!form.email) {
            errors.email = 'Email is required!';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!form.password) {
            errors.password = 'Password is required!';
        } else if (form.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long!';
        }

        return errors;
    };


    //it is used when the form is submitted, sends message to the backend to either login or register
    //if successful/denied  response is saved in message
    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateInfo(form)
        setErrors(errors);

        //check to see if the password is grater than 6
        if (form.password.length >= 6) {

            if (mode === 'login') {
                axios.post('http://localhost:4000/login', form)
                    .then((response) => {
                        if (response.data === 'Logged in successfully') {
                            setMessage('Logged in successfully');

                            setLoggedIn(true);
                            localStorage.setItem('isLoggedIn', JSON.stringify(true));
                            localStorage.setItem('username', JSON.stringify(form.username));
                            window.location.href = '/';


                        } else {
                            setMessage('Login failed; please double-check your input details or create a new account.');
                        }

                    })

            } else {
                axios.get(`http://localhost:4000/checkUser/${form.username}`)
                    .then((response) => {
                        if (response.data === 'User exists') {
                            setMessage('User already exists');
                            return;
                        } else {
                            axios.post('http://localhost:4000/register', form)
                                .then((response) => {
                                    setMessage(response.data);
                                    setLoggedIn(true);
                                    localStorage.setItem('isLoggedIn', JSON.stringify(true));
                                    window.location.href = '/';

                                })
                        }
                    })
                    .catch((error) => {
                        setMessage("You must fill out the form before submitting it.");
                    });

            }
            setErrors(errors);
        }
    };

    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (isLoggedIn) {
            setLoggedIn(isLoggedIn);
        }
    }, []);


    return (
        <div className="LoginRegister">
            <div className="Form">
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="error-message" > {errors.username}</p>}
                    {mode === 'register' && (
                        <>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error-message" > {errors.email}</p>}
                        </>
                    )}
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error-message" > {errors.password}</p>}

                    <button type="submit" className='btn'>
                        {mode === 'login' ? 'Login' : 'Register'}
                    </button>

                    <button type="button" className='btn' onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
                        Switch to {mode === 'login' ? 'Register' : 'Login'}
                    </button>
                </form>
                {message && <p className="message" >{message}</p>}

            </div>
        </div>
    );
};

//ternary operator

export default LoginRegister;




