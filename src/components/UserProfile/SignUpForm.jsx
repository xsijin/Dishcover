import React, { useState } from 'react';
import './SignUpForm.css';

export default function SignUpForm() {

    const [signUpInput, setSignUpInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (evt) => {
        setSignUpInput({
            ...signUpInput,
            [evt.target.name]: evt.target.value
        });
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const response = await fetch('http://localhost:3000/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: signUpInput.firstName,
                lastName: signUpInput.lastName,
                email: signUpInput.email,
                password: signUpInput.password
            })
        });

        if (response.ok) {
            const newUser = await response.json();
            console.log(newUser);
        } else {
            console.error('Failed to create new user.');
        }
    }

    return (
            <div className="card card-side bg-base-100 shadow-xl">
                <form onSubmit={handleSubmit} className="userForm">

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="lavel-text font-bold">First Name</span>
                        </div>
                        <input 
                            type="text"
                            name="firstName"
                            value={signUpInput.firstName}
                            onChange={handleInputChange}
                            placeholder="Type here" 
                            className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="lavel-text font-bold">Last Name</span>
                        </div>
                        <input 
                        type="text" 
                        name="lastName"
                        value={signUpInput.lastName}
                        onChange={handleInputChange}
                        placeholder="Type here" 
                        className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="lavel-text font-bold">Email</span>
                        </div>
                        <input 
                            type="text" 
                            name="email"
                            value={signUpInput.email}
                            onChange={handleInputChange}
                            placeholder="Type here" 
                            className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="lavel-text font-bold">Password</span>
                        </div>
                        <input 
                            type="password" 
                            name="password"
                            value={signUpInput.password}
                            onChange={handleInputChange}
                            placeholder="Type here" 
                            className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="lavel-text font-bold">Confirm Password</span>
                        </div>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            value={signUpInput.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Type here" 
                            className="input input-bordered input-sm w-full max-w-xs" />
                    </label>

                    <button className="btn btn-submit">Sign Up</button>
                </form>
            </div>
    )
}