import React, { useState, useEffect } from 'react';
import PropertiesService from '../services/Properties';
import base64toblob from '../utils/base64toblob';
import { useParams, useHistory } from 'react-router-dom';

const LandStore = React.createContext({});
const { Provider } = LandStore;

//@ts-ignore
const LandProvider = ({ children, isModify }) => {

    const history = useHistory();
    const initialPropertyValues = {
        title: "",
        coords: null,
        uploadedImages: []
    }
    const [landProperties, setLandProperties] = useState<any>(initialPropertyValues);
    //@ts-ignore
    const { shortId } = useParams();

    function setUploadedImages(images: Array<string>) {
        const newImages = [...images];
        setLandProperties({
            ...landProperties,
            uploadedImages: newImages
        })
    };

    function deleteImages(imageUrl: string) {
        let newImages = landProperties.uploadedImages.filter((image: any) => {
            let deleteId = image.id || image
            return deleteId !== imageUrl;
        });
        if (isModify) {
            let deletedImages = landProperties.deletedImages ? landProperties.deletedImages.slice() : [];
            deletedImages.push(imageUrl);
            setLandProperties({
                ...landProperties,
                deletedImages,
                uploadedImages: newImages
            })
        } else {
            setLandProperties({
                ...landProperties,
                uploadedImages: newImages
            })
        }
    };

    function setPropertyCoords(latLng: any) {
        setLandProperties({
            ...landProperties,
            coords: JSON.parse(JSON.stringify(latLng))
        })
    };

    async function onSub(form: object) {

        try {
            const response = await sendDataToBackend(form);
            alert("Proprietate trimisa cu succes");
        } catch (err) {
            alert(err);
        }

    };

    function getPropertyInfo(shortId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await PropertiesService.getLand(shortId);
                const { title,
                    description,
                    coords,
                    imagesUrls,
                    price,
                    isFeatured,
                    features,
                    transactionType,
                    propertyType,
                    address } = response.data;

                const data = {
                    title,
                    description,
                    uploadedImages: imagesUrls,
                    isFeatured,
                    transactionType,
                    propertyType,
                    address,
                    price,
                    // in db it's stored lng lat
                    coords: { lat: coords[1], lng: coords[0] },
                    ...features
                };

                setLandProperties(data);
                resolve(data);
            } catch (err) {
                alert(err);
            }
        })

    };

    function sendDataToBackend(formFields: any) {
        return new Promise(async (resolve, reject) => {
            const formData = new FormData();
            landProperties.uploadedImages.forEach(async (file: any) => {
                if (typeof file.url !== "undefined" && file.url.indexOf("data") > -1) {
                    let base64Content = file.url.replace(/^data:image\/(png|jpg);base64,/, "");
                    formData.append("images", await base64toblob(base64Content, file.type))
                } else {
                    formData.append("images", file);
                }
            });

            Object.entries(formFields).forEach((value: any) => {
                formData.append(value[0], value[1] || "");
            });

            // send as array of lng lat
            //@ts-ignore
            formData.append("coords", JSON.stringify(landProperties.coords) || "");

            try {
                if (isModify) {
                    const response = await PropertiesService.updateLand(formData, shortId);
                    alert("Teren modificata cu success");
                } else {
                    const response = await PropertiesService.addLand(formData);
                    alert("Teren adaugata cu succes!");
                }
            } catch (err) {
                console.log(err);
                alert("Eroare la incarcarea proprietatii, mai incearca");
            }
        })
    };

    const handleRemove = async (shortId: string) => {
        try {
            let response = PropertiesService.removeLand(shortId);
            history.goBack();
        } catch (err) {
            alert(err);
        }
    };
    const state = {
        landProperties,
        isModify
    };

    const actions = {
        setUploadedImages,
        sendDataToBackend,
        onSub,
        setPropertyCoords,
        getPropertyInfo,
        handleRemove,
        deleteImages
    }

    return (<Provider value={{ ...state, ...actions }}>{children}</Provider>)
}

export { LandProvider, LandStore }
