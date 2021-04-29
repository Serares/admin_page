import React from 'react';
import ApartmentForm from '../../components/PropertiesForm/ApartmentForm';
import { EPropertyTypes } from '../../interfaces/EPropertyTypes';


type AddPropertiesPropType = {
    propertyType: EPropertyTypes,
    isModify: boolean
}

export default function AddProperties(props: AddPropertiesPropType) {
    const { propertyType, isModify } = props;

    const renderForm = () => {
        switch (propertyType) {
            case (EPropertyTypes.APARTMENT):
                return <ApartmentForm isModify={isModify} />;
            case (EPropertyTypes.HOUSE):
                return <div>Casa</div>;
            case (EPropertyTypes.LANDANDCOMMERCIAL):
                return <div>Teren</div>;

        }
    };

    return (
        <React.Fragment>
            {renderForm()}
        </React.Fragment>
    )
}