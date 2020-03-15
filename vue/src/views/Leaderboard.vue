<template>
  <div class="container">
    <div class="header">
      <h1>Leaderboard {{route.params.leaderboard}}</h1>
      <transition name="slide">
        <input type="text" v-model="addUser.name" v-if="addUser.showInput" @keyup.enter="add">
      </transition>
      <button @click="add" :class="{ active: addUser.showInput }">ADD WARRIOR</button>
    </div>
    <Highscore :players="warriors"/>
  </div>
</template>

<script>
import { inject, reactive, toRefs } from 'vue'
import { retrieveWarriors } from '@/api.js'
import Highscore from '@/components/Highscore'
import firebase from '@/firebaseinit';

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
      // const functiona = firebase.app().functions('europe-west1');
      // functiona.useFunctionsEmulator('http://localhost:5001');
      // const addWarrior = functiona.httpsCallable('addWarrior');
      const addWarrior = firebase.app().functions('europe-west1').httpsCallable('addWarrior');
      const { data }  = await addWarrior({leaderboard: route.value.params.leaderboard.toLowerCase(), user: addUser.name});
      if(!data.success){
        alert(data.msg);
      }

      addUser.showInput = false;
      addUser.name = '';
      //TODO reload api call
    }

    return { route, ...toRefs(state), add, addUser }
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
</style>