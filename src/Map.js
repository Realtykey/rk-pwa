import * as React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from 'react-map-gl-geocoder';
//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { setMapAction } from './redux';
//icon
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { geocode } from "../src/map_api";


const MAPBOX_TOKEN = "pk.eyJ1Ijoic3RlYWx0aDE0IiwiYSI6ImNrNGhvY3hkdjFjY2kza283eDhzcGRnYmkifQ.mZXxhWd9yvNen0-qpoEnsg";

export default function Map() {
    const mapRef = useRef();
    //redux
    const dispatch = useDispatch();
    const setMap = map => dispatch(setMapAction(map));
    const map = useSelector(state => state.general.map);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: 400,
        latitude: -0.175698,
        longitude: -78.485593,
        zoom: 15,
    });

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );
    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            });
        },
        []
    );
    const handleClick = async (e) => {
        setMap(
            {
                lng: e.lngLat[0],
                lat: e.lngLat[1],
                snapUrl: `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${viewport.longitude},${viewport.latitude},${viewport.zoom},0/1100x400?access_token=${MAPBOX_TOKEN}`,
            }
        );



    }

   
    return (
        <div>
            <ReactMapGL
                ref={mapRef}
                {...viewport}
                onClick={handleClick}
                onViewportChange={nextViewport => setViewport(nextViewport)}
            >
                <Geocoder
                    mapRef={mapRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    position="top-left"
                    countries='ec'
                    language='es'
                />
                <Marker latitude={map.lat} longitude={map.lng} offsetLeft={-20} offsetTop={-10}>
                    <FontAwesomeIcon style={{ fontSize: 30 }} color='purple' icon={faHome} />
                </Marker>
            </ReactMapGL>
        </div>
    );
}