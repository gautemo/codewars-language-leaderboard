<template>
  <div class="row">
    <span class="place">{{place + 1}}</span>
    <span class="name">{{name}}</span>
    <Cell title="Average Honor" :value="average"/>
    <Cell title="Total Honor" :value="total"/>
  </div>
</template>

<script>
import Cell from './Cell'
import { computed, watch } from 'vue'

export default {
  setup(props){
    const total = computed(() => props.language[1].reduce((acc, current) => acc + current.score, 0));
    const average = computed(() => (total.value / props.language[1].length).toFixed(2));
    return { place: props.place, name: props.language[0], total, average}
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
    color: var(--secondary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 1.2em;
    height: 30px;
    width: 30px;
    margin: 15px;
}
</style>
