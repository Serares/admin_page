import React, { useState, useEffect } from 'react';
import Axios from '../services/Auth';
const AuthenticationStore = React.createContext({});
const { Provider } = AuthenticationStore;

//@ts-ignore
const AuthenticationProvider = ({ children }) => {

    function postSignup(formInputs: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Axios.sigup(formInputs);
                resolve("Signup success");
            } catch (err) {
                reject(err);
            }
        })
    }

    function postLogin(formInputs: any): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Axios.login(formInputs);
                window.localStorage.setItem("adminToken", response.data);
                resolve("Login success!");
            } catch (err) {
                reject(err);
            }
        })
    }


    const state = {
    };

    const actions = {
        postLogin,
        postSignup
    };

    return (<Provider value={{ ...state, ...actions }}>{children}</Provider>)
}

export { AuthenticationProvider, AuthenticationStore }
