import React, { useState, useEffect } from 'react';
import Axios from '../services/SubmitedProperties';

type SubmitedPropertiesStoreType = {
    //TODO
    properties: Array<any>,
    singleProperty: any
};

const initialState: SubmitedPropertiesStoreType = {
    properties: [],
    singleProperty: {}
};

const SubmitedPropertiesStore = React.createContext(initialState);
const { Provider } = SubmitedPropertiesStore;
//@ts-ignore
const SubmitedPropertiesProvider = ({ children }) => {

    const [properties, setProperties] = useState([]);
    const [singleProperty, setSingleProperty] = useState({});

    //TODO handle errors
    async function getAllProperties() {
        const response = await Axios.getAll();
        setProperties(response.data);
    };

    async function getSingleProperty(id: string) {
        if (id) {
            try {
                const response = await Axios.getSingle(id);
                setSingleProperty(response.data);
            } catch (err) {
                alert(err)
            }
        } else {
            // TODO handle error
            alert("error");
        }
    };

    function deleteSingleProperty(shortId: string, gcsSubfolderId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Axios.remove(shortId, gcsSubfolderId);
                resolve("Deleted success");
            } catch (err) {
                reject(err);
            }
        })
    }

    const state = {
        properties,
        singleProperty
    };

    const actions = {
        getAllProperties,
        getSingleProperty,
        deleteSingleProperty
    };

    return (<Provider value={{ ...state, ...actions }}>{children}</Provider>)
}

export { SubmitedPropertiesProvider, SubmitedPropertiesStore }
