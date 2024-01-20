import { useEffect, useState } from "react";

export default function ProfileForm({ user }) {
    const [updateInput, setUpdateInput] = useState(user);
    const [updateMsg, setUpdateMsg] = useState({
        res: false,
        success: false,
        msg: ""
    });

    const handleInputChange = (evt) => {
        setUpdateInput({
            ...updateInput,
            [evt.target.name]: evt.target.value
        });
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const response = await fetch(`http://localhost:3000/users/update/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: updateInput.firstName,
                lastName: updateInput.lastName,
                email: updateInput.email
            })
        });

        if (response.ok) {
            const updatedUser = await response.json();
            console.log(updatedUser);
            setUpdateMsg({
                res: true,
                success: true,
                msg: "Profile Updated!"
            });
        } else {
            console.error('Failed to update user.');
            setUpdateMsg({
                res: true,
                success: false,
                msg: "Failed to update profile"
            })
        }
    }

    return (
        <>
            <div className="modal-box">

            <form method="dialog">
                <button onClick={()=>setUpdateMsg({ res: false, success: false, msg: ""})} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Update Profile</h3>

            <form onSubmit={handleSubmit} className="userForm">

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

                {updateMsg.res 
                    ? <p>{updateMsg.msg}</p>
                    : null
                }

                <button className="btn btn-submit">Update</button>
            </form>
            
            </div>
        </>
    )
}