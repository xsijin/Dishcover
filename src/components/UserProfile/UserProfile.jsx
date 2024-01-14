import React, { useEffect, useState } from "react";

export default function UserProfile() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users/show');
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
                <ul>
                    {users.map((user) => 
                        <li key={user._id}>
                            <p><b>{user.name}</b></p>
                            <p>{user.email}</p>
                        </li>
                    )}
                </ul>
            )}
        </>
    );
}
