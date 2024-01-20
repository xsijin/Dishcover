import './UserProfile.css';
import './ProfileForm';
import ProfileForm from './ProfileForm';

export default function UserProfile({ user }) {

    return (
        <>
            <li key={user._id} className="flex justify-between gap-x-6 py-5">
                <div className="card card-side bg-base-100 shadow-xl">
                <figure><img src="https://www.mob.co.uk/_next/image?url=https%3A%2F%2Ffiles.mob-cdn.co.uk%2Ffiles%2FIMG_0699.jpg&w=1536&q=75" alt="Movie"/></figure>
                <div className="card-body">
                    <h2 className="card-title">{user.firstName} {user.lastName}</h2>
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
                    <div className="card-actions justify-end">
                        <div className="dropdown dropdown-bottom dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgba(61, 120, 101, 1)" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li onClick={()=>document.getElementById('profileForm').showModal()}>
                                    <a>Update Profile</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <dialog id="profileForm" className="modal">
                            <ProfileForm user={user} />
                    </dialog>
                </div>
            </li>
        </>
    );
}
