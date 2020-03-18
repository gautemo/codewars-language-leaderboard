<template>
  <div class="container">
    <div class="header">
      <h1>Leaderboard {{board}}</h1>
      <div class="sort">
        <button class="toggle" :class="{ sel: !allTime }" @click="allTime = false">MONTH</button>
        <button class="toggle" :class="{ sel: allTime}" @click="allTime = true">ALL-TIME</button>
      </div>
      <transition name="slide">
        <input type="text" v-model="addUser.name" v-if="addUser.showInput" @keyup.enter="add">
      </transition>
      <button @click="add" :class="{ active: addUser.showInput }">ADD WARRIOR</button>
    </div>
    <Highscore/>
  </div>
</template>

<script>
import { inject, reactive, toRefs } from 'vue'
import Highscore from '@/components/Highscore'
import { functions } from '@/firebaseinit';
import { state, addWarrior } from '@/state.js';

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
    state.board = route.value.params.leaderboard;

    const addUser = reactive({
      showInput: false,
      name: ''
    });
    const add = async () => {
      if(!addUser.showInput){
        addUser.showInput = true;
        return;
      }
      if(!addUser.name){
        return;
      }
      const success = await addWarrior(addUser.name);

      if(success){
        addUser.showInput = false;
        addUser.name = '';
      }
    }

    return { board: state.board, allTime: toRefs(state).allTime, add, addUser }
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
  margin: 20px 25px;
  flex-flow: wrap;
  justify-content: flex-end;
}

.header h1{
  position: absolute;
  top: 0;
  left: 25px;
}

.sort{
  flex: 1;
}

.header button{
  height: 40px;
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

.header button.active{
  border: 2px solid rgb(5, 158, 5);
  color: rgb(5, 158, 5);
}

input{
  align-self: center;
  font-size: 1.1em;
  width: 175px;
  box-sizing: border-box;
  height: 40px;
}

.slide-enter-active, .slide-leave-active {
  transition: all 1.5s;
}
.slide-enter-from {
  width: 0;
}

.slide-leave-active {
  transition: opacity .3s;
}
.slide-leave-to {
  opacity: 0;
}

.sort .toggle.sel{
  background: var(--secondary-color);
  border: 2px solid var(--secondary-color);
  color: var(--white);
}
</style>