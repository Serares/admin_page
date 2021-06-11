import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom"
import { AuthenticationStore } from '../../../store/authenticationStore';
import LoginForm from "../../../components/LoginForm/LoginForm";

export default function Login() {
  const history = useHistory();
  //@ts-ignore TODO take out ts-ignore
  const { postLogin } = useContext(AuthenticationStore);

  const handleForm = (form: object) => {
    postLogin(form)
      .then((data: any) => {
        history.push("/dashboard");
      })
      .catch((err: any) => {
        //TODO handle error
        alert("Login failed");
      })
  };

  const goToSignup = () => {
    history.push("/signup");
  }

  return (
    <div className="login-container">
      <div className="login-container__form">
        <LoginForm loading={false} goToSignup={goToSignup} handleForm={handleForm} />
      </div>
    </div>
  );
}
