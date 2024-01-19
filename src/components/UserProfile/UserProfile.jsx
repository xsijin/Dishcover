import React, { useEffect, useState } from "react";
import './UserProfile.css';
import { Link } from "react-router-dom";

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
                                <p style={{ textAlign:"left" }}>{user.bio}</p>
                                <div className="socialInfo" style={{ display:"flex", flexDirection:"row", marginTop:"1rem" }}>
                                    <button className="btn btn-square btnSocial">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgba(61, 120, 101, 1)" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                        </svg>

                                    </button>
                                    <p className="userEmail">{user.email}</p>
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
