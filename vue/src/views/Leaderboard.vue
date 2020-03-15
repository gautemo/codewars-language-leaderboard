<template>
  <div class="container">
    <div class="header">
      <h1>Leaderboard {{route.params.leaderboard}}</h1>
      <button>ADD WARRIOR</button>
    </div>
    <Highscore :players="warriors"/>
  </div>
</template>

<script>
import { inject, reactive, toRefs } from 'vue'
import { retrieveWarriors } from '@/api.js'
import Highscore from '@/components/Highscore'

function customColor(leaderboard){
  if(leaderboard.toLowerCase() == '2s'){
    document.documentElement.style.setProperty('--main-color', '#cf022b');
    document.documentElement.style.setProperty('--secondary-color', '#ef7c05');
  }
}

export default {
  setup(){
    const route = inject('route');
    customColor(route.value.params.leaderboard)

    const state = reactive({
      warriors: []
    })
    retrieveWarriors().then(warriors => state.warriors = warriors);

    return { route, ...toRefs(state) }
  },
  components: { Highscore }
}
</script>

<style scoped>
.container{
  height: 100%;
  background: #071e22;
  box-shadow: 0 0 0px 200px #071e22;
  color: #f7f7f7;
}

.header{
  display: flex;
  margin: 0 20px;
}

.header h1{
  flex: 1;
}

.header button{
  border: 2px solid var(--white);
  background: transparent;
  color: var(--white);
  padding: 10px 15px;
  cursor: pointer;
  -webkit-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out;
  align-self: center;
}

.header button:hover{
  border: 2px solid var(--main-color);
  color: var(--main-color);
}
</style>