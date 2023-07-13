import React, { useRef, useState } from 'react'
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import { Input } from 'antd';

const GoogleAutoPlace = ({ setAddres, address }) => {
    // ==================== places components ====================//
    const inputRef = useRef()

    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();
        if (place) {
            setAddres(place.formatted_address)
            console.log(place.formatted_address);

        }
    }
    // ==================== places components ====================//

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyC5_O_glkBNQmfXdOS7GyuRJKH7RqVPlbE'
            libraries={["places"]}
        >
            <StandaloneSearchBox
                onLoad={ref => (inputRef.current = ref)}
                onPlacesChanged={handlePlaceChanged}
            >
                <Input value={address} onChange={(e) => setAddres(e.target.value)} placeholder='Event Street Address' style={{ padding: 10 }} />

            </StandaloneSearchBox>

        </LoadScript>
    )
}

export default GoogleAutoPlace