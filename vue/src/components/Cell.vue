<template>
  <div>
    <h3>{{title}}</h3>
    <h2>{{value}}</h2>
  </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
  setup(props){
    const { title, value } = toRefs(props);
    return { title, value } 
  }
}

</script>

<style scoped>
div{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 20px;
}
h3{
    font-weight: normal;
    font-size: 1em;
}
h2,h3{
    margin: 0;
}
</style>
