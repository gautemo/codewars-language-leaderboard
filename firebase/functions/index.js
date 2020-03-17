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
    if(!doc.data()){
        return { success: false, msg: 'Leaderboard does not exists' };
    }
    if (doc.data().users.includes(user)){
        return { success: false, msg: 'User already exists.' };
    }
    await usersRef.update({
        users: admin.firestore.FieldValue.arrayUnion(user),
        startOfMonth: admin.firestore.FieldValue.arrayUnion(`${user}~${JSON.stringify(cwData.ranks.languages)}`)
    });

    return { success: true, msg: 'User added.' };
});

exports.getAllWarriors = functions.region('europe-west1').https.onCall(async (data, context) => {
    const board = data.leaderboard;
    
    const doc = await db.collection('leaderboards').doc(board).get();
    const leaderboard = doc.data();
    if (!leaderboard) {
        return { success: false, msg: 'Leaderboard does not exists' };
    }
    const usersPromise = leaderboard.users.map(u => getCodeWarsUser(u));

    const usersInfo = await Promise.all(usersPromise);
    for(const user of usersInfo){
        const startOfMonth = JSON.parse(leaderboard.startOfMonth.find(s => s.split('~')[0] === user.username).split('~')[1]);
        for (const [language, { score }] of Object.entries(startOfMonth)) {
            const lang = user.ranks.languages[language];
            lang.monthScore = lang.score - score;
        }
    }
    return { success: true, users: usersInfo };
});

exports.resetMonthscore = functions.region('europe-west1').pubsub.schedule('1 of month 00:00').timeZone('Europe/Oslo').onRun(async (context) => {
    const boards = await db.collection('leaderboards').get();
    for (const doc of boards.docs) {
        const startOfMonth = [];
        for(const user of doc.data().users){
            const cwData = await getCodeWarsUser(user);
            startOfMonth.push(`${user}~${JSON.stringify(cwData.ranks.languages)}`);
        }
        await db.collection('leaderboards').doc(doc.id).update({startOfMonth});
    }
    return null;
});

const getCodeWarsUser = async username => {
    const resp = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
    return await resp.json();
}