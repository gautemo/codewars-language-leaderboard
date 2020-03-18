import { reactive, computed, watchEffect } from "vue";
import { functions } from '@/firebaseinit';

const state = reactive({
    board: '',
    warriors: [],
    languages: computed(() => {
        const map = new Map();
        for (const p of state.warriors) {
            for (const [language, { score, monthScore }] of Object.entries(p.ranks.languages)) {
                if (!map.has(language)) {
                    map.set(language, []);
                }
                map.get(language).push({ user: p.username, score, monthScore });
            }
        }
        return [...map].sort((a, b) => total(b[1]) - total(a[1]));
    }),
    allTime: false,
    sortBy: computed(() => state.allTime ? 'score' : 'monthScore'),
})

const total = arr => arr.reduce((acc, current) => acc + current[state.sortBy], 0)

const reload = async () => {
    console.log('reloading')
    const getAllWarriors = functions.httpsCallable('getAllWarriors');
    const { data } = await getAllWarriors({ leaderboard: state.board.toLowerCase() });
    if (!data.success) {
        alert(data.msg);
    }
    state.warriors = data.users;
}

const addWarrior = async name => {
    // const functiona = firebase.app().functions('europe-west1');
    // functiona.useFunctionsEmulator('http://localhost:5001');
    // const addWarrior = functiona.httpsCallable('addWarrior');
    const addWarrior = functions.httpsCallable('addWarrior');
    const { data } = await addWarrior({ leaderboard: state.board.toLowerCase(), user: name });
    if (!data.success) {
        alert(data.msg);
        return false;
    }
    reload();
    return true;
}

watchEffect(() => {
    if (state.board) reload();
});

export { state, addWarrior }