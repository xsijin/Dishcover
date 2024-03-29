import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";

export default function UserProfileList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://ga-p3-backend.onrender.com/users/show');
                const result = await response.json();
                setUsers(result.users);
                console.log(result);
                
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <h1>User Profiles</h1>
            {users.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul role="list" className="divide-y divide-gray-100">
                    {users.map((user) => {
                        return <UserProfile user={user} key={user._id} />
                        }
                    )}
                </ul>
            )}

        </>
    )
}