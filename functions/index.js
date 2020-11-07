const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createMatch = functions.firestore
  .document(`requests/{id}`)
  .onCreate(async (snap, context) => {
    const {matchedProp} = require('./matches.js');
    return matchedProp(snap);
  });

exports.geocodeRequestLocation = functions.firestore
  .document(`requests/{id}`)
  .onWrite(async (change, context) => {
    if (change.after.exists) {
      const data = change.after.data();
      const {updateAddress} = require('./location.js');

      return await updateAddress(data,'requests');
    }
    //no olvidar retornar promesa
  });

exports.geocodePropertyLocation = functions.firestore
.document(`properties/{id}`)
.onWrite(async (change, context) => {
  if (change.after.exists) {
    const {updateAddress} = require('./location.js');
    const data = change.after.data();
    
    return await updateAddress(data,'properties');
  }
  //no olvidar retornar promesa
});

//algolia search

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