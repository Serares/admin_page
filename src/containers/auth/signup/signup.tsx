import React, { useContext } from "react";
import { useHistory } from "react-router-dom"
import { AuthenticationStore } from '../../../store/authenticationStore';

import SignupForm from "../../../components/SignupForm/SignupForm";

export default function Signup() {
    const history = useHistory();
    //@ts-ignore
    const { postSignup } = useContext(AuthenticationStore);

    const handleForm = (form: object) => {
        postSignup(form)
            .then(() => {
                history.push("/login");
            })
            .catch((err: any) => {
                alert("Eroare, mai incearca")
            })
    };

    const goToLogin = () => {
        history.push("/login")
    }

    return (
        <div >
            <div >
                <SignupForm loading={false} goToLogin={goToLogin} handleForm={handleForm} />
            </div>
        </div>
    );
}
