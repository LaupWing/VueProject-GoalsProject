<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <add-goal msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import AddGoal from './components/AddGoal.vue'

export default {
  name: 'app',
  components: {
    AddGoal
  }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("https://source.unsplash.com/1600x900/?achievement");
  background-size:cover;
  width: 100vw;
  height: 100vh;
}
</style>
