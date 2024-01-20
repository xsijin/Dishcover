import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function LoginSignUp() {

    return (
        <>
        <div role="tablist" className="tabs tabs-bordered">
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Login" />
            <div role="tabpanel" className="tab-content p-10">
                <LoginForm />
            </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Sign Up" checked />
            <div role="tabpanel" className="tab-content p-10">
                <SignUpForm />
            </div>

        </div>
        </>
    )
}