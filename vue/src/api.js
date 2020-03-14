const retrieveWarriors = async (leaderboard) => {
    const resp = await fetch('https://europe-west1-codewars-leaderboard-2s.cloudfunctions.net/getAllWarriors');
    return await resp.json();
}

export { retrieveWarriors };