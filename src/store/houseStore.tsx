import React, { useState, useEffect } from 'react';
import PropertiesService from '../services/Properties';
import base64toblob from '../utils/base64toblob';
import { useParams, useHistory } from 'react-router-dom';

const HouseStore = React.createContext({});
const { Provider } = HouseStore;

//@ts-ignore
const HouseProvider = ({ children, isModify }) => {
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
        uploadedImages: [],
        deletedImages: [] // deleted images for backend
    }
    const [houseProperties, setHouseValues] = useState<any>(initialPropertyValues);
    //@ts-ignore
    const { shortId } = useParams();

    function setUploadedImages(images: Array<string>) {
        const newImages = [...images];
        setHouseValues({
            ...houseProperties,
            uploadedImages: newImages
        })
    };

    function deleteImages(imageUrl: string) {
        let newImages = houseProperties.uploadedImages.filter((image: any) => {
            let deleteId = image.id || image
            return deleteId !== imageUrl;
        });
        if (isModify) {
            let deletedImages = houseProperties.deletedImages ? houseProperties.deletedImages.slice() : [];
            deletedImages.push(imageUrl);
            setHouseValues({
                ...houseProperties,
                deletedImages,
                uploadedImages: newImages
            })
        } else {
            setHouseValues({
                ...houseProperties,
                uploadedImages: newImages
            })
        }
    };

    function setPropertyCoords(latLng: any) {
        setHouseValues({
            ...houseProperties,
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
                const response = await PropertiesService.getHouse(shortId);
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

                const data = {
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

                setHouseValues(data);
                resolve(data);
            } catch (err) {
                alert(err);
            }
        })

    };

    function sendDataToBackend(formFields: any) {
        return new Promise(async (resolve, reject) => {
            const formData = new FormData();
            houseProperties.uploadedImages.forEach(async (file: any) => {
                if (typeof file.url !== "undefined" && file.url.indexOf("data") > -1) {
                    let base64Content = file.url.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                    formData.append("images", await base64toblob(base64Content, file.type))
                } else {
                    formData.append("images", file);
                }
            });

            if (houseProperties.deletedImages && houseProperties.deletedImages.length > 0) {
                houseProperties.deletedImages.forEach((img: string) => {
                    formData.append("deletedImages", img);
                })
            }

            Object.entries(formFields).forEach((value: any) => {
                formData.append(value[0], value[1] || "");
            });

            Object.entries(houseProperties.utilities).forEach((value) => {
                //@ts-ignore
                if (typeof value[1] === "object" && value[1].length > 0) {
                    //@ts-ignore
                    value[1].forEach(utility => {
                        formData.append(value[0], utility);
                    })
                }
            });

            Object.entries(houseProperties.amenities).forEach((value) => {
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
            formData.append("coords", JSON.stringify(houseProperties.coords) || "");

            try {
                if (isModify) {
                    const response = await PropertiesService.updateHouse(formData, shortId);
                    alert("Casa modificata cu success");
                } else {
                    const response = await PropertiesService.addHouse(formData);
                    alert("Casa adaugata cu succes!");
                }
            } catch (err) {
                console.log(err);
                alert("Eroare la incarcarea proprietatii, mai incearca");
            }
        })
    };

    const handleGeneralUtilities = (value: string, category: string) => {
        //@ts-ignore
        let newGeneral = [...houseProperties.utilities[category], value];
        //@ts-ignore
        if (houseProperties.utilities[category].includes(value)) {
            newGeneral = newGeneral.filter(utility => utility !== value);
        };

        setHouseValues({
            ...houseProperties,
            utilities: {
                ...houseProperties.utilities,
                //@ts-ignore
                [category]: newGeneral
            }
        });
    };

    const handleAmenities = (value: string, category: string) => {
        //@ts-ignore
        let newAmenities = [...houseProperties.amenities[category], value];
        //@ts-ignore
        if (houseProperties.amenities[category].includes(value)) {
            newAmenities = newAmenities.filter(amenity => amenity !== value);
        };

        setHouseValues({
            ...houseProperties,
            amenities: {
                ...houseProperties.amenities,
                //@ts-ignore
                [category]: newAmenities
            }
        });
    };

    const handleRemove = async (shortId: string) => {
        try {
            let response = PropertiesService.removeHouse(shortId);
            history.goBack();
        } catch (err) {
            alert(err);
        }
    };
    const state = {
        houseProperties,
        isModify
    };

    const actions = {
        setUploadedImages,
        sendDataToBackend,
        onSub,
        handleGeneralUtilities,
        handleAmenities,
        setPropertyCoords,
        getPropertyInfo,
        handleRemove,
        deleteImages
    }

    return (<Provider value={{ ...state, ...actions }}>{children}</Provider>)
}

export { HouseProvider, HouseStore }
