import { useEffect, useState } from "react";

export default function ProfileForm({ user }) {
    const [updateInput, setUpdateInput] = useState(user);

    const handleInputChange = (evt) => {
        setUpdateInput({
            ...updateInput,
            [evt.target.name]: evt.target.value
        });
    }

    return (
        <>
            <h3 className="font-bold text-lg">Update Profile</h3>

            <form className="userForm">

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="lavel-text font-bold">First Name</span>
                    </div>
                    <input 
                        type="text"
                        name="firstName"
                        value={updateInput.firstName}
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
                    value={updateInput.lastName}
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
                        value={updateInput.email}
                        onChange={handleInputChange}
                        placeholder="Type here" 
                        className="input input-bordered input-sm w-full max-w-xs" />
                </label>

                <button className="btn btn-submit">Update</button>
            </form>
        </>
    )
}