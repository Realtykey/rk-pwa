const create = async (values, currentUser, userData) => {
    const { db, firebase } = await import('../base');
    let ref = db.collection('news').doc();

    const post = {
        user: {
            uid: currentUser.uid,
            photoUrl: userData.photoUrl,
        },
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        id: ref.id,
        ...values
    }

    return ref.set(post, { merge: true });
}

const remove = async (id) => {
    const { db } = await import('../base');
    return db.collection('news').doc(id).delete();
} 

export {create,remove};