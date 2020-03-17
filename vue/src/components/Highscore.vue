<template>
  <div class="list">
    <details v-for="(language, i) in languages" :key="language[0]">
      <summary :style="{ background: `rgba(240, 125, 0, ${1 - i/3})` }">
        <Info :language="language" :place="i" />
      </summary>
      <Players :players="language[1]" :allTime="allTime"/>
    </details>
  </div>
</template>

<script>
import Info from './Info'
import Players from './Players'
import { watch, computed } from 'vue';

export default {
  setup(props){
    const languages = computed(() => toLanguages(props.players, props.allTime))
    return { languages, allTime: props.allTime }
  },
  components:{ Info, Players }
}

const averageScore = clan => clan.totalHonor / clan.users.length;

const toLanguages = (players, allTime) => {
  const map = new Map();
  for(const p of players){
    for(const [language, { score, monthScore }] of Object.entries(p.ranks.languages)){
      if(!map.has(language)){
        map.set(language, []);
      }
      map.get(language).push({ user: p.username, score, monthScore });
    }
  }

  let sortBy = 'score';
  if(!allTime) sortBy = 'monthScore'

  return [...map].sort((a,b) => total(b[1], sortBy) - total(a[1], sortBy));
}

const total = (arr, score) => arr.reduce((acc, current) => acc + current[score], 0)
</script>

<style scoped>
.list{
  margin: 15px 0;
}

summary{
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
}
</style>
