<template>
    <div class="players">
        <div class="row" v-for="player in playersSorted" :key="player.user">
            <span class="name">
                <a :href="`https://www.codewars.com/users/${player.user}`" target="_blank" rel="noopener">
                    {{player.user}}
                </a>
            </span>
            <Cell title="Month Score" :value="player.monthScore"/>
            <Cell title="Total Score" :value="player.score"/>
        </div>
    </div>
</template>

<script>
import Cell from './Cell'
import { computed } from 'vue'
import { state } from '@/state.js';

export default {
    setup(props){
        let sortBy = 'score';
        if(!props.allTime) sortBy = 'monthScore'

        const playersSorted = computed(() => [...props.players].sort((a,b) => {
            const diff = b[state.sortBy] - a[state.sortBy];
            if(diff !== 0){
                return diff;
            }
            return b[state.thenSortBy] - a[state.thenSortBy];
        }));

        return { playersSorted }
    },
    components: { Cell }
}

</script>

<style scoped>
.players{
    font-size: 0.9em;
    margin: 0 2%;
}
.row{
    display: flex;
    align-items: center;
}

.name{
    flex: 1;
    margin: 0 15px;
    font-size: 1.15em;
}

a{
    color: inherit;
}
</style>
