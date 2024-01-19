import './SignUpForm.css';

export default function SignUpForm() {

    return (

        <div className="card card-side bg-base-100 shadow-xl userForm">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="lavel-text font-bold">First Name</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="lavel-text font-bold">Last Name</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="lavel-text font-bold">Email</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="lavel-text font-bold">Password</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="lavel-text font-bold">Confirm Password</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
            </label>

            <button className="btn btn-submit">Sign Up</button>
        </div>
    )
}