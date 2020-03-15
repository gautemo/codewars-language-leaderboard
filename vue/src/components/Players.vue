<template>
    <div class="players">
        <div class="row" v-for="player in playersSorted" :key="player.user">
            <span class="name">
                <a :href="`https://www.codewars.com/users/${player.user}`" target="_blank" rel="noopener">
                    {{player.user}}
                </a>
            </span>
            <Cell title="Honor" :value="player.score"/>
        </div>
    </div>
</template>

<script>
import Cell from './Cell'
import { computed } from 'vue'

export default {
    setup(props){
        const playersSorted = computed(() => [...props.players].sort((a,b) => b.score - a.score));

        return { players: props.players, playersSorted }
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
