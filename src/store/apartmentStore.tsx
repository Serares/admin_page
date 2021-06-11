import React, { useState, useEffect } from 'react';
import PropertiesService from '../services/Properties';
import base64toblob from '../utils/base64toblob';
import { useParams, useHistory } from 'react-router-dom';

const ApartmentStore = React.createContext({});
const { Provider } = ApartmentStore;

type ApartmentPropertiesType = {
    uploadedImages: Array<string>,
    initialUtilitiesValues: {
        general: [],
        heatingSystem: [],
        conditioning: []
    }
};

//@ts-ignore
const ApartmentProvider = ({ children, isModify }) => {
    const history = useHistory();
    const initialUtilitiesValues = {
        general: [],
        heatingSystem: [],
        conditioning: []
    };
    const initialAmenities = {
        building: []
    };
    const initialPropertyValues = {
        title: "",
        utilities: initialUtilitiesValues,
        amenities: initialAmenities,
        coords: null,
        uploadedImages: []
    }
    const [apartmentProperties, setApartmentProperties] = useState<any>(initialPropertyValues);
    //@ts-ignore
    const { shortId } = useParams();

    function setUploadedImages(images: Array<string>) {
        const newImages = [...images];
        setApartmentProperties({
            ...apartmentProperties,
            uploadedImages: newImages
        })
    };

    function setPropertyCoords(latLng: any) {
        setApartmentProperties({
            ...apartmentProperties,
            coords: JSON.parse(JSON.stringify(latLng))
        })
    };

    async function onSub(form: object) {

        try {
            const response = await sendDataToBackend(form);
            alert("Apartment trimis cu succes");
        } catch (err) {
            alert(err);
        }

    };

    function getApartmentInfo(shortId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await PropertiesService.getApartment(shortId);
                const { title,
                    description,
                    coords,
                    imagesUrls,
                    price,
                    amenities,
                    utilities,
                    isFeatured,
                    features,
                    transactionType,
                    propertyType,
                    address } = response.data;

                const apartmentData = {
                    title,
                    description,
                    uploadedImages: imagesUrls,
                    amenities,
                    utilities,
                    isFeatured,
                    transactionType,
                    propertyType,
                    address,
                    price,
                    // in db it's stored lng lat
                    coords: { lat: coords[1], lng: coords[0] },
                    ...features
                };

                setApartmentProperties(apartmentData);
                resolve(apartmentData);
            } catch (err) {
                alert(err);
            }
        })

    };

    function sendDataToBackend(apartmentFields: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const formData = new FormData();
                apartmentProperties.uploadedImages.forEach(async (file: any) => {
                    if (typeof file.url !== "undefined" && file.url.indexOf("data") > -1) {
                        let base64Content = file.url.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                        formData.append("images", await base64toblob(base64Content, file.type))
                    } else {
                        formData.append("images", file);
                    }
                });

                Object.entries(apartmentFields).forEach((value: any) => {
                    formData.append(value[0], value[1] || "");
                });

                Object.entries(apartmentProperties.utilities).forEach((value) => {
                    //@ts-ignore
                    if (typeof value[1] === "object" && value[1].length > 0) {
                        //@ts-ignore
                        value[1].forEach(utility => {
                            formData.append(value[0], utility);
                        })
                    }
                });

                Object.entries(apartmentProperties.amenities).forEach((value) => {
                    //@ts-ignore
                    if (typeof value[1] === "object" && value[1].length > 0) {
                        //@ts-ignore
                        value[1].forEach(utility => {
                            formData.append(value[0], utility);
                        })
                    }
                });

                // send as array of lng lat
                //@ts-ignore
                formData.append("coords", JSON.stringify(apartmentProperties.coords) || "");

                if (isModify) {
                    const response = await PropertiesService.updateApartment(formData, shortId);
                    alert("Apartament modificat cu success");
                } else {
                    const response = await PropertiesService.addApartment(formData);
                    alert("Apartament adaugat cu succes!");
                }
            } catch (err) {
                console.log(err);
                alert("Eroare la incarcarea proprietatii, mai incearca");
            }
        })
    };

    const handleGeneralUtilities = (value: string, category: string) => {
        //@ts-ignore
        let newGeneral = [...apartmentProperties.utilities[category], value];
        //@ts-ignore
        if (apartmentProperties.utilities[category].includes(value)) {
            newGeneral = newGeneral.filter(utility => utility !== value);
        };

        setApartmentProperties({
            ...apartmentProperties,
            utilities: {
                ...apartmentProperties.utilities,
                //@ts-ignore
                [category]: newGeneral
            }
        });
    };

    const handleAmenities = (value: string, category: string) => {
        //@ts-ignore
        let newAmenities = [...apartmentProperties.amenities[category], value];
        //@ts-ignore
        if (apartmentProperties.amenities[category].includes(value)) {
            newAmenities = newAmenities.filter(amenity => amenity !== value);
        };

        setApartmentProperties({
            ...apartmentProperties,
            amenities: {
                ...apartmentProperties.amenities,
                //@ts-ignore
                [category]: newAmenities
            }
        });
    };

    const handleRemove = async (shortId: string) => {
        try {
            let response = PropertiesService.removeApartment(shortId);
            history.goBack();
        } catch (err) {
            alert(err);
        }
    };

    const state = {
        apartmentProperties,
        isModify
    };

    const actions = {
        setUploadedImages,
        sendDataToBackend,
        onSub,
        handleGeneralUtilities,
        handleAmenities,
        setPropertyCoords,
        getApartmentInfo,
        handleRemove
    };

    return (<Provider value={{ ...state, ...actions }}>{children}</Provider>)
}

export { ApartmentProvider, ApartmentStore }
