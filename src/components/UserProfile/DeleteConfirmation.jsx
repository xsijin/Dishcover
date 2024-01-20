import { useState } from "react";
import { useNavigate } from "react-router";

export default function DeleteConfirmation({ user }) {
    const navigate = useNavigate();

    const [deleteMsg, setDeleteMsg] = useState({
        res: false,
        success: false,
        msg: ""
    })

    const handleDeleteUser = async () => {
        console.log("user: ", user);
        try {
            const response = await fetch(`http://localhost:3000/users/delete/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigate('/users');
                console.log('User deleted');
            } else {
                throw new Error("Failed to delete user.");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to delete this account?</h3>
                <p className="py-4">You cannot undo this action.</p>
                <div className="modal-action">
                    <button className="btn" onClick={() => handleDeleteUser()}>Yes</button>
                    <form method="dialog">
                        <button className="btn">No</button>
                    </form>
                </div>
            </div>
        </>
    )
}