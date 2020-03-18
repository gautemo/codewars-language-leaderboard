<template>
  <div class="list">
    <details v-for="(language, i) in languages" :key="language[0]">
      <summary :style="{ background: `rgba(240, 125, 0, ${1 - i/3})` }">
        <Info :language="language" :place="i" />
      </summary>
      <Players :players="language[1]"/>
    </details>
  </div>
</template>

<script>
import Info from './Info'
import Players from './Players'
import { state } from '@/state.js';
import { toRefs } from 'vue';

export default {
  setup(){
    return { languages: toRefs(state).languages }
  },
  components:{ Info, Players }
}
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
