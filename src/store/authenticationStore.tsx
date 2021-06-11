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

    function deleteToken(): Promise<boolean> {
        return new Promise((resolve) => {
            if (window.localStorage.getItem("adminToken")) {
                window.localStorage.removeItem("adminToken");
                resolve(true);
            }
            resolve(false);
        })
    }

    const state = {
    };

    const actions = {
        postLogin,
        postSignup,
        deleteToken
    };

    return (<Provider value={{ ...state, ...actions }}>{children}</Provider>)
}

export { AuthenticationProvider, AuthenticationStore }
