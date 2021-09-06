import React from 'react'
import PropTypes from 'prop-types'

import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByPlaceId
} from 'react-google-places-autocomplete'
import { useDispatch } from 'react-redux'
import { setMapAction } from '../redux.js'

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic3RlYWx0aDE0IiwiYSI6ImNrNGhvY3hkdjFjY2kza283eDhzcGRnYmkifQ.mZXxhWd9yvNen0-qpoEnsg'

const API_KEY = 'AIzaSyCZw9OFpZPxogZSm1J08zeW2yjomK-CVm0'

const GeocoderInput = (props) => {
  const { setPosition } = props
  const dispatch = useDispatch()

  const setMap = (map) => dispatch(setMapAction(map))

  return (
    <div id="geocoder" style={{ color: 'black', margin: '10px 0px' }}>
      <GooglePlacesAutocomplete
        apiKey={API_KEY}
        minLengthAutocomplete={3}
        selectProps={{
          onChange: (change) => {
            geocodeByPlaceId(change.value.place_id)
              .then(async (results) => {
                const { lat, lng } = await getLatLng(results[0])
                setPosition({ latitude: lat, longitude: lng })
                // eslint-disable-next-line camelcase
                const { secondary_text, main_text } =
                  change.value.structured_formatting
                setMap({
                  // eslint-disable-next-line camelcase
                  address: secondary_text + ' ' + main_text,
                  lat,
                  lng,
                  snapUrl: `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${lng},${lat},15,0/1100x400?access_token=${MAPBOX_TOKEN}`
                })
              })
              .catch((error) => alert(error))
          }
        }}
        autocompletionRequest={{
          componentRestrictions: {
            country: ['ec']
          }
        }}
      />
    </div>
  )
}

GeocoderInput.propTypes = {
  setPosition: PropTypes.func.isRequired
}

export default GeocoderInput
