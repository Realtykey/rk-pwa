const admin = require('firebase-admin');
admin.initializeApp();
db = admin.firestore();

const array = require('./assets/properties.json')

array.forEach(
    prop => console.log('name: ',prop.name)
)
