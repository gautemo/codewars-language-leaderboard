const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const app = admin.initializeApp();
const db = app.firestore();

exports.addWarrior = functions.region('europe-west1').https.onCall(async (data, context) => {
    const board = data.leaderboard;
    const user = data.user;

    const cwData = await getCodeWarsUser(user);
    if (cwData.reason === 'not found'){
        return { success: false, msg: 'User does not exist in Codewars.' };
    }

    const usersRef = db.collection('leaderboards').doc(board);
    const doc = await usersRef.get();
    if (doc.data().users.includes(user)){
        return { success: false, msg: 'User already exists.' };
    }
    await usersRef.update({
        users: admin.firestore.FieldValue.arrayUnion(user)
    });
    return { success: true, msg: 'User added.' };
});

exports.getAllWarriors = functions.region('europe-west1').https.onCall(async (data, context) => {
    const board = data.leaderboard;
    
    const doc = await db.collection('leaderboards').doc(board).get();
    const usersPromise = doc.data().users.map(u => getCodeWarsUser(u));

    const usersInfo = await Promise.all(usersPromise);
    return { users: usersInfo };
});

const getCodeWarsUser = async username => {
    const resp = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
    return await resp.json();
}