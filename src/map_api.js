const MAPBOX_TOKEN = "pk.eyJ1Ijoic3RlYWx0aDE0IiwiYSI6ImNrNGhvY3hkdjFjY2kza283eDhzcGRnYmkifQ.mZXxhWd9yvNen0-qpoEnsg";

export const geocode = async (map) => {
  const longitude = map.lng;
  const latitude = map.lat;

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=poi&access_token=${MAPBOX_TOKEN}`;
   
    const response = await fetch(url);
    const feature = await response.json();
    return feature;
}