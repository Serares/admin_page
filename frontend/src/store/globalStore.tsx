import React, { useState, useEffect } from 'react';

const GlobalStore = React.createContext({});
const { Provider } = GlobalStore;

//@ts-ignore
const GlobalProvider = ({ children }) => {
    
    const routes = {
        ADD_PROPERTY: "/admin/postAddProperty",
    };

    const state = {
    };

    const actions = {
    }

    return (<Provider value={{ ...state, ...actions }}>{children}</Provider>)
}

export { GlobalProvider, GlobalStore }
