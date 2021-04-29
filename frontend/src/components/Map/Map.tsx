import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import classes from './Map.module.css';

const defaultPosition = {
    lat: 44.43560467579475,
    lng: 26.102614402771
};

function LocationMarker(props: any) {

    const { getMapCoords, propertyCoords } = props;

    const map = useMapEvents({
        click(e: any) {
            console.log(e);
            getMapCoords(JSON.parse(JSON.stringify(e.latlng)));
        }
    });

    return (
        //@ts-ignore
        <Marker position={propertyCoords || defaultPosition}>
            <Popup>You are here</Popup>
        </Marker>
    )
};

export default function MapComponent(props: any) {
    const { getMapCoords, propertyCoords } = props;

    return (
        <div className={classes.MapStyle}>
            {/* <input type="hidden" name="location_coordonates" value={createLocationValue()} /> */}
            {/* @ts-ignore */}
            <MapContainer center={defaultPosition} zoom={13}>
                <TileLayer
                    // @ts-ignore
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    url="https://api.mapbox.com/styles/v1/empten/ck9qwupj76bgi1ipde38gjsmg/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZW1wdGVuIiwiYSI6ImNrOXF3eWh0azBvbXkzbHFjMWNoY2x1NzIifQ.xolL5C6kDqZvZzRFoCmdMg"
                />
                {<LocationMarker getMapCoords={getMapCoords} propertyCoords={propertyCoords} />}
            </MapContainer>
        </div>
    )
};
