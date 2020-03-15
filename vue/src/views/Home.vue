<template>
  <div>
    <h1>Welcome to leaderboard for <a href="https://www.codewars.com/" target="_blank" rel="noopener">Codewars</a></h1>
    <label for="leaderboard-input">Leaderboard:</label>
    <input type="text" id="leaderboard-input" v-model="board">
    <button @click="toBoard">Go</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { router } from '@/router';

export default {
  name: 'Home',
  setup(){
    const board = ref('');

    const toBoard = () => {
      router.push('/' + board.value)
    }

    return { board, toBoard }
  }
}
</script>

<style scoped>
label{
  display: block;
}
input{
  flex: 1;
  font-size: 1.5em;
  border-radius: 5px 0 0 5px;
  border: 2px solid #333;
  text-align: center;
  padding: 20px 0;
}

button{
  border-radius: 0 5px 5px 0;
  border: 2px solid #333;
  background: #333;
  color: white;
  font-size: 1.5em;
  padding: 20px;
  cursor: pointer;
}

div{
  margin: 20px auto;
  display: table;
}
</style>
