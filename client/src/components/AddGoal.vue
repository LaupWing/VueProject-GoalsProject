<template>
    <div id="add">
        <div v-if="!createdGoalsCollection">
            Add Collection of Goals
            <input type="text" v-model="newGoalCollection">
            <button @click="createdNewGoals">Create Goals Collection</button>
        </div>
        <div v-if="createdGoalsCollection">
            Collection: {{newGoalCollection}}
            <div 
                v-for="(goal, index) in goalsArray"
                v-bind:key="index+'A'"
            >
                <h2>{{goal.goalName}}</h2>
            </div>
            <div v-if="addingGoalName">
                Add Goal
                <input type="text" v-model="goalName">
                <button @click="createdGoalName">Add Goal</button>
            </div>
            <div v-if="addedGoalName">
                <h2>Goal: {{goalName}}</h2>
                <p
                    v-for="(task, index) in tasksArray"
                    v-bind:key="index"
                >
                    Task: {{task}}
                </p>
                <input type="text" v-model="taskName">
                <div v-if="!addedGoal">
                    <button @click="addingTask">Add subtask</button>
                    <button @click="addingGoal">Done</button>
                </div>
            </div>
            <div v-if="addedGoal">
                <p>You want to add another goal?</p>
                <button @click="anotherGoal(true)">Add Another Goal</button>
                <button @click="anotherGoal(false)">Nope</button>
            </div>
        </div>
        <!-- <button @click='postGoal'>POST IT</button> -->
    </div>
</template>

<script>
import GoalService from '../GoalsService'
export default {
  name: 'HelloWorld',
  data(){
      return{
          goals                     :   [],
          createdGoalsCollection    :   false,
          addedGoalName             :   false,
          addingGoalName            :   false,
          addedGoal                 :   false,
          newGoalCollection         :   '',
          tasksArray                :   [],
          goalsArray                :   [],
          goalName                  :   '',
          taskName                  :   '',
          error                     :   ''
      }
  },
  props: {
    msg: String
  },
  methods:{
        createdGoalName(){
            this.addedGoalName  = true
            this.addingGoalName = false
        },
        addingGoal(){
            const tasks = this.tasksArray
            .map(task=>{
                return {
                    taskname: task, 
                    done:false
                    }
                })
            this.goalsArray.push({goalName: this.goalName, tasks: tasks})
            this.addedGoal      =   true
            // Reset Values
            this.goalName       =   ''
            this.taskName       =   ''
            this.tasksArray     =   []
            this.addedGoalName  =   false
        },
        anotherGoal(add){
            this.addedGoal      =   false
            if(!add){
                this.createdGoalsCollection = false
                return
            }
            this.addingGoalName =   true
        },
        addingTask(){
            this.tasksArray
                .push(this.taskName)
            this.taskName = ''
        },
        createdNewGoals(){
            this.createdGoalsCollection =   true
            this.addingGoalName         =   true
        },
        async postGoal(){
            await GoalService.insertGoal(this.newGoalCollection, this.goalsArray)
        } 
  },
  async created(){
    try{
        this.goals = await GoalService.getGoals()
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
#add{
    width: 80vw;
    max-width: 500px;
    margin: auto;
    background: orange;
}
</style>
