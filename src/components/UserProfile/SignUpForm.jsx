import React, { useState } from 'react';
import './SignUpForm.css';
import { hashData } from "../../util/security";
import { signUp } from "../../service/users";

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

    function hashPassword() {
        var currForm = signUpInput;
        if (currForm.password) {
            console.log(currForm.password)
            var hash = hashData(currForm.password);
            currForm.password = hash.hash;
            currForm.salt = hash.salt;
            currForm.iterations = hash.iterations;
        }  
    }

    const handleSubmit = async (evt) => {

        try {
            evt.preventDefault();

            hashPassword();
            const signUpData = {...signUpInput};
            delete signUpData.confirmPassword;
            console.log("signUpData ", signUpData);
            const user = await signUp(signUpData);
            console.log("user: ", user);
    
            // const response = await fetch('https://ga-p3-backend.onrender.com/users/create', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         firstName: signUpInput.firstName,
            //         lastName: signUpInput.lastName,
            //         email: signUpInput.email,
            //         password: signUpInput.password
            //     })
            // });    

        } catch(err) {
            console.error(err);
        }

        // if (response.ok) {
        //     const newUser = await response.json();
        //     console.log(newUser);
        // } else {
        //     console.error('Failed to create new user.');
        // }
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