const functions = require('firebase-functions');

const getAddress = (featureCollection) => {

    if (featureCollection.features.length > 0) {
        console.log(featureCollection);
        console.log(featureCollection.features[0].properties);

        const city = featureCollection.features[0].context[0].text;
        const province = featureCollection.features[0].context[1].text;
        const country = featureCollection.features[0].context[2].text;
        const address = featureCollection.features[0].properties.address;

        return `${city}, ${province}${address ? ', ' + address : ""}`;
    }

    return 'empty results';
}

export const updateAddress = async data => {
    const { id, map } = data;
    const { lat, lng } = map;

    const MAPBOX_TOKEN = "pk.eyJ1Ijoic3RlYWx0aDE0IiwiYSI6ImNrNGhvY3hkdjFjY2kza283eDhzcGRnYmkifQ.mZXxhWd9yvNen0-qpoEnsg";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=poi&access_token=${MAPBOX_TOKEN}`;

    const response = await fetch(url);
    const featureCollection = await response.json();

    const address = getAddress(featureCollection);

    const db = admin.firestore();

    return db.collection('requests').doc(id).update({"map.address":address});

}

