<template>
  <div id="app">
    <add-collection msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import AddCollection from './components/AddCollection.vue'

export default {
  name: 'app',
  components: {
    AddCollection
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
  font-family: 'Montserrat', sans-serif; 
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
    transition: .25s;
    cursor: pointer;
    outline: none;
}
button:hover{
    color: black;
    background: white;
}
input[type="text"]{
    border: white solid 2px;
    border-right: none;
    font-family: 'Montserrat', sans-serif; 
    padding: 5px;
}
</style>
