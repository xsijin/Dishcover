import { useState } from "react";

export default function LoginForm() {
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (evt) => {
        setLoginInput({
            ...loginInput,
            [evt.target.name]: evt.target.value
        });
    }

    const handleSubmit = () => {
        
    }

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <form onSubmit={handleSubmit} className="userForm">

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="lavel-text font-bold">Email</span>
                    </div>
                    <input 
                        type="text"
                        name="email"
                        value={loginInput.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email here" 
                        className="input input-bordered input-sm w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="lavel-text font-bold">Password</span>
                    </div>
                    <input 
                    type="text" 
                    name="password"
                    value={loginInput.password}
                    onChange={handleInputChange}
                    placeholder="Enter your email here" 
                    className="input input-bordered input-sm w-full max-w-xs" />
                </label>

                <button className="btn btn-submit">Login</button>
            </form>
        </div>
    )
}