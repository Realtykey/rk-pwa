const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createMatch = functions.firestore
  .document(`requests/{id}`)
  .onCreate(async (snap, context) => {
    const {matchedProp} = require('./matches.js');
    return matchedProp(snap);
  });

exports.propsIndexing = require('./algolia.js')('properties','dev_PROPERTIES');
exports.reqsIndexing = require('./algolia.js')('requests','dev_REQUESTS');
exports.usersIndexing = require('./algolia.js')('users','dev_USERS');