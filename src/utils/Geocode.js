import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useDispatch, useSelector } from "react-redux";
import { setMapAction } from '../redux.js';

import { getLatLng,geocodeByPlaceId } from 'react-google-places-autocomplete';
const MAPBOX_TOKEN = "pk.eyJ1Ijoic3RlYWx0aDE0IiwiYSI6ImNrNGhvY3hkdjFjY2kza283eDhzcGRnYmkifQ.mZXxhWd9yvNen0-qpoEnsg";

const GeocoderInput = ({setPosition}) => {
  const dispatch = useDispatch();

  const map = useSelector(state => state.general.map);
  const setMap = map => dispatch(setMapAction(map));



  return (
    <div style={{ color: 'black' }}>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyCZw9OFpZPxogZSm1J08zeW2yjomK-CVm0"
        minLengthAutocomplete={3}

        selectProps={{
          onChange: change => {
            geocodeByPlaceId(change.value.place_id)
            .then(async results => {
              const {lat,lng} = await getLatLng(results[0]);
              setPosition({latitude:lat,longitude:lng});
              const {secondary_text,main_text} = change.value.structured_formatting;
              setMap({
                address: secondary_text+" "+main_text,
                lat,
                lng,
                snapUrl: `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${lng},${lat},15,0/1100x400?access_token=${MAPBOX_TOKEN}`,
              });
            })
            .catch(error => alert(error));
          }
        }}
        autocompletionRequest={{
          componentRestrictions: {
            country: ['ec'],
        }}}
      />
    </div>
  )
};

export default GeocoderInput;