<template>
  <div id="app">
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
  background: 
    linear-gradient(
      rgba(0, 0, 0, 0.35), 
      rgba(0, 0, 0, 0.35)
    ),
    url("./assets/2.jpg");
  background-size:cover;
  width: 100vw;
  height: 100vh;
}
.centering{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
button{
    font-family: 'Montserrat', sans-serif; 
    background: transparent;
    padding:5px 10px;
    border: white solid 2px;
    color: white;
    white-space: nowrap;
}
input[type="text"]{
    border: white solid 2px;
    border-right: none;
}
</style>
