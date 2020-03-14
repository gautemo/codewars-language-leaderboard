<template>
  <header></header>
  <main>
    <router-view/>
  </main>
  <MyFooter/>
</template>

<script>
import MyFooter from './components/MyFooter';

export default {
  components: {
    MyFooter
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Baloo+Chettan+2&display=swap');

:root{
  --main-color: #4481eb;
  --secondary-color: #04befe;
  --my-gradient: linear-gradient(to right, var(--main-color) 0%, var(--secondary-color) 100%);
  --white: #f7f7f7;
}

body{
  margin: 0;
}

#app{
  font-family: 'Baloo Chettan 2', cursive;
  font-size: 1.05em;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

main{
  flex: 1;
  width: 100%;
}

header, footer{
  width: 100%;
}

header{
  filter: drop-shadow(0 8px #3333);
}

header::before{
  content: "";
  display: block;
  background: var(--my-gradient);
  clip-path: polygon(0 0,100% 0,100% 70%,0 100%);
  height: 130px;
}

header > a {
  position: absolute;
  top: 50px;
  left: max(var(--paper-margin), (100vw - 900px)/2);
  font-size: 1.6em;
  font-family: 'Oxanium';
  color: inherit;
  text-decoration: inherit;
}

footer{
  filter: drop-shadow(0 -4px #3333);
  position: relative;
}

footer::before{
  content: "";
  display: block;
  background: var(--my-gradient);
  clip-path: polygon(0 30%,100% 0,100% 100%,0 100%);
  height: 180px;
}

footer .content{
  position: absolute;
  bottom: 10px;
  left: 25px;
}
</style>