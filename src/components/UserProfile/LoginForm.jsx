import { useState } from "react";
import { getLoginDetails, loginUser } from "../../service/users";
import { hashDataWithSaltRounds, storeToken } from "../../util/security";

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

    const handleSubmit = async (evt) => {
        try {
            evt.preventDefault();

            const loginData = {...loginInput};
            console.log("loginForm data: ", loginData);

            // get user salt and iterations from DB
            const loginDetails = await getLoginDetails(loginData.email);
            console.log("loginDetails: ", loginDetails);

            // hash password
            const hashedPassword = hashDataWithSaltRounds(loginData.password, loginDetails.salt, loginDetails.iterations);
            loginData.password = hashedPassword;

            // get token
            const token = await loginUser(loginData);
            // store token in localStorage
            storeToken(token);

        } catch(err) {
            console.error(err);
        }
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