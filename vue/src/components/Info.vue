<template>
  <div class="row">
    <span class="place">{{place + 1}}</span>
    <span class="name">{{name}}</span>
    <Cell title="Month Score" :value="month"/>
    <Cell title="Total Score" :value="total"/>
  </div>
</template>

<script>
import Cell from './Cell'
import { computed, watch } from 'vue'

export default {
  setup(props){
    const total = computed(() => props.language[1].reduce((acc, current) => acc + current.score, 0));
    const month = computed(() => props.language[1].reduce((acc, current) => acc + current.monthScore, 0));
    return { place: props.place, name: props.language[0], total, month}
  },
  components: { Cell }
}

</script>

<style scoped>
.row{
    display: flex;
    align-items: center;
    width: 100%
}

.lead{
    background: var(--first-color);
}

.name{
    flex: 1;
    font-weight: bold;
    font-size: 1.5em;
    margin: 0 15px;
}
.place{
    background: var(--white);
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 1.2em;
    font-weight: bold;
    height: 30px;
    width: 30px;
    margin: 15px;
}
</style>
