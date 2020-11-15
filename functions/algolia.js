const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(APP_ID, ADMIN_KEY);

module.exports = (collectionName, indexName)  => {

    const index = client.initIndex(indexName);

    const save = snapshot => {
        const data = snapshot.data();
        const objectID = snapshot.id;
        return index.saveObject({ ...data, objectID });
    }

    const update = change => {
        const newData = change.after.data();
        const objectID = change.after.id;
        return index.saveObject({ ...newData, objectID });
    }

    const remove = snapshot => {
        return index.deleteObject(snapshot.id);
    }


    const addToIndex = functions.firestore
        .document(`${collectionName}/{id}`)
        .onCreate(snapshot => {
            return save(snapshot);
        });

    const updateIndex = functions.firestore
        .document(`${collectionName}/{id}`)
        .onUpdate((change) => {
            return update(change);
        });

    const deleteFromIndex = functions.firestore
        .document(`${collectionName}/{id}`)
        .onDelete(snapshot => {
            return remove(snapshot);
        });

    return { addToIndex, updateIndex, deleteFromIndex };
};