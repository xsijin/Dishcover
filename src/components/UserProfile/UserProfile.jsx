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
                <ul role="list" className="divide-y divide-gray-100">
                    {users.map((user) => 
                        <li key={user._id} className="flex justify-between gap-x-6 py-5">

                            <div className="card card-side bg-base-100 shadow-xl">
                            <figure><img src="https://www.mob.co.uk/_next/image?url=https%3A%2F%2Ffiles.mob-cdn.co.uk%2Ffiles%2FIMG_0699.jpg&w=1536&q=75" alt="Movie"/></figure>
                            <div className="card-body">
                                <h2 className="card-title">{user.name}</h2>
                                <p>{user.email}</p>
                                <div className="card-actions justify-end">
                                <button className="btn btn-primary">Favourite</button>
                                </div>
                            </div>
                            </div>

                        </li>
                    )}
                </ul>
            )}
        </>
    );
}
