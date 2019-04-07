<template>
    <div>
        Add Task 
        <input type="text" v-model="addTask">
        {{addTask}}
        <button @click="addingTask">GO</button>
        <p 
            v-for="(goal,index) in newGoalTasks"
            v-bind:key="index"
        >
            {{goal}}
        </p>
        <button @click='postGoal'>POST IT</button>
    </div>
</template>

<script>
import GoalService from '../GoalsService'
export default {
  name: 'HelloWorld',
  data(){
      return{
          goals: [],
          newGoal: '',
          newGoalTasks:[],
          addTask: '',
          error: ''
      }
  },
  props: {
    msg: String
  },
  methods:{
      addingTask(){
            this.newGoalTasks.push({
                task: this.addTask,
                iets:[
                    {
                        iets: 'iets'
                    }
                ]
            })
          console.log(this.newGoalTasks)
      },
      async postGoal(){
          await GoalService.insertGoal('test', this.newGoalTasks)
      } 
  },
  async created(){
      try{
          this.goals = await GoalService.getGoals()
          console.log(this.goals)
      }catch(err){
          this.error = err.message;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
