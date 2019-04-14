<template>
    <div id="add">
        <!-- Als Goal collection benaming nog niet is gedefineerd  
        ####################### createdGoalsCollection = false-->
        <div class="addCollection centering" v-if="!createdGoalsCollection">
            <h2>
                Add Collection of Goals
            </h2>
            <form>
                <input type="text" v-model="newGoalCollection">
                <button @click="createdNewGoals">Create</button>
            </form>
        </div>
        <!-- Als Goal collection benaming nog gedefineerd is  
        ####################### createdGoalsCollection = true-->
        <div class="addGoal" v-if="createdGoalsCollection">
            <h2 class="goalCollection">
                Collection: <span>{{newGoalCollection}}</span>
            </h2>  
            <div 
                v-for="(goal, index) in goalsArray"
                v-bind:key="index+'A'"
            >
                <h2>{{goal.goalName}}</h2>
            </div>
            <!-- Als addingGoalname is true oftwel voeg goalName toe -->
            <div class="centering" v-if="addingGoalName">
                <form action="">
                    <input type="text" v-model="goalName">
                    <button @click="createdGoalName">Add Goal</button>
                </form>
            </div>
            <!--Note dit is addedGoalname (goalname is toegevoegd) -->
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
            await GoalService.insertGoal(this.newGoalCollection, this.goalsArrayc)
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
h2{
    font-weight: 400;
}
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
form{
    display: flex;
    width: 100%;
}
form input[type="text"]{
    outline: none;
    width: 100%;
}
#add{
    width: 80vw;
    max-width: 420px;
    /* background: rgba(255,255,255,.5); */
    margin: auto;    
}

.addCollection,
.addGoal{
    padding: 20px;
}

.addCollection{
    font-family: 'Montserrat', sans-serif;
    color: white;
}
.addCollection h2{
    margin: 10px;
}
.addCollection form input{
    width: 100%;
    outline: none;
}
.addGoal{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.goalCollection{
    text-align: left;
    margin-right: auto;
    font-size: 20px;
    color: white;
    display: inline-block;
    background: orange;
    padding: 7px 10px 4px 10px;
}
.goalCollection span{
    color: black;
}
.addGoal div{
    width: 100%;
}

</style>
