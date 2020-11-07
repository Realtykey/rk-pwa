const {updateAddress} = require('./location.js');

const turf = require('@turf/turf');

const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const getDistance = (fromCoords, toCoords) => {

  var from = turf.point(fromCoords);
  var to = turf.point(toCoords);

  var options = { units: 'kilometers' };
  var distance = turf.distance(from, to, options);

  console.log(distance);

  return distance;
}

//mecanismo de matches
const matchedProp = async (reqDoc) => {
  // let reqData = reqDoc.data();
  let reqData = reqDoc.data();

  //matches prioritarios
  let ref = db.collection('properties');

  let promise = await ref.get().then(
    async (snap) => {
      //itera props resultado

      let matchedProps = snap.docs.filter(doc => doc.data().bathrooms >= reqData.bathrooms)
        .filter(doc => doc.data().dormitories >= reqData.dormitories)
        .filter(doc => doc.data().operation === reqData.operation)
        .filter(doc => doc.data().propType === reqData.propType)
        .filter(doc => doc.data().parkings >= reqData.parkings)
        .filter(doc => doc.data().area >= reqData.area)
        .filter(doc => doc.data().price <= reqData.price)
        .filter(doc => {
          let fromCoords = [doc.data().map.lng, doc.data().map.lat];
          let toCoords = [reqData.map.lng, reqData.map.lat];

          let distance = getDistance(fromCoords, toCoords);
          console.log(distance);

          return distance < 2;
        });

      console.log(matchedProps.length)
      matchedProps.forEach(
        async prop => {
          console.log(prop)
          await createMatch(reqData, prop, false)

        }
      )

      return true
    }

    //matches de sugerencia



  )

  return promise;
}

//requiere currentUser
const createMatch = async (reqData, propDoc, suggestion) => {
  let uid = reqData.uid;
  let propData = propDoc.data();
  //pendiente optimizar 
  let requesterDoc = await db.collection('users').doc(uid).get();
  let ownerDoc = await db.collection('users').doc(propData.uid).get();

  let requesterData = requesterDoc.data();
  let ownerData = ownerDoc.data();

  //distance variables

  let fromCoords = [reqData.map.lng, reqData.map.lat];
  let toCoords = [propData.map.lng, propData.map.lat];

  let match = {
    suggestion: suggestion,
    uid: uid,
    distance: getDistance(fromCoords, toCoords),
    // key: 9, <= se agrega en el cliente
    // selected: false, <= se agrega en el cliente
    requesterData: requesterData,
    ownerData: ownerData,
    prop: propData,
  }
  //guarda match en subcolección de owner
  const id = `${uid}_${propDoc.id}_${ownerDoc.id}`;
  db.collection('users').doc(ownerDoc.data().uid).collection('matches')
    .doc(`${uid}_${propDoc.id}_${ownerDoc.id}`).set({...match,id}, { merge: true });

  //guarda match en subcolección de requester
  db.collection('users').doc(uid).collection('matches')
    .doc(`${uid}_${propDoc.id}_${ownerDoc.id}`).set({...match,id}, { merge: true });

  //retorna doc de match
}

exports.createMatch = functions.firestore
  .document(`requests/{id}`)
  .onCreate(async (snap, context) => {

    return matchedProp(snap);
  });

  
exports.geocodeRequestLocation = functions.firestore
  .document(`requests/{id}`)
  .onWrite(async (change, context) => {
    if (change.after.exists) {
      const data = change.after.data();
      return await updateAddress(data,'requests');
    }
    //no olvidar retornar promesa
  });

exports.geocodePropertyLocation = functions.firestore
.document(`properties/{id}`)
.onWrite(async (change, context) => {
  if (change.after.exists) {
    const data = change.after.data();
    return await updateAddress(data,'properties');
  }
  //no olvidar retornar promesa
});

//algolia search (properties)

exports.addToIndex = functions.firestore
.document('properties/{id}')
.onCreate(snapshot => {
  const {save}  = require('./algolia.js');
  return save(snapshot);
});

exports.updateIndex = functions.firestore
.document('properties/{id}')
.onUpdate((change) => {
  const {update}  = require('./algolia.js');
  return update(change);
});

exports.deleteFromIndex = functions.firestore
.document('properties/{id}')
.onDelete(snapshot => {
  const {remove}  = require('./algolia.js');
  return remove(snapshot);
} 
);