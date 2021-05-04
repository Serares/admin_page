import React from 'react';
import ApartmentForm from '../../components/PropertiesForm/ApartmentForm';
import HouseForm from '../../components/PropertiesForm/HouseForm';
import LandForm from '../../components/PropertiesForm/LandForm';
import { EPropertyTypes } from '../../interfaces/EPropertyTypes';


type SingleAdminProperty = {
    propertyType: EPropertyTypes
}

export default function SingleAdminProperty(props: SingleAdminProperty) {
    const { propertyType } = props;

    const renderForm = () => {
        switch (propertyType) {
            case (EPropertyTypes.APARTMENT):
                return <ApartmentForm />;
            case (EPropertyTypes.HOUSE):
                return <HouseForm />;
            case (EPropertyTypes.LANDANDCOMMERCIAL):
                return <LandForm />;

        }
    };

    return (
        <React.Fragment>
            {renderForm()}
        </React.Fragment>
    )
}