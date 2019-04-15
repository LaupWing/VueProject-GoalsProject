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
                class="goalResult"
            >
                <h3><span>Goal Name: </span>{{goal.goalName}}</h3>
                <p><span>Total Tasks: </span>{{goal.tasks.length}}</p>
            </div>
            <!-- Als addingGoalname is true oftwel voeg goalName toe -->
            <div class="centering" v-if="addingGoalName">
                <form action="">
                    <input type="text" v-model="goalName">
                    <button @click="createdGoalName">Add Goal</button>
                </form>
            </div>
            <!--Note dit is addedGoalname (goalname is toegevoegd) -->
            <div class="tasks" v-if="addedGoalName">
                <h3><span>Goal:</span>{{goalName}}</h3>
                <p
                    v-for="(task, index) in tasksArray"
                    v-bind:key="index"
                    class="task"
                >
                    <span>{{index+1}}:</span>{{task}}
                </p>
                <div v-if="!addedGoal">
                    <div class="addTask">
                        <input type="text" v-model="taskName">
                        <button @click="addingTask">Add Task</button>
                    </div>
                    <button class="confirm" @click="addingGoal">Done</button>
                </div>
            </div>
            <div class="confirmation" v-if="addedGoal">
                <div class="addAnotherGoal">
                    <p>You want to add another goal?</p>
                    <button @click="anotherGoal(true)">Add Another Goal</button>
                    <button @click="anotherGoal(false)">Nope</button>
                </div>
            </div>
        </div>
        <!-- <button @click='postGoal'>POST IT</button> -->
    </div>
</template>

<script>
import CRUDService from '../CRUDService'
export default {
  name: 'HelloWorld',
  data(){
      return{
          collections               :   [],
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
                this.postCollection()
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
        async postCollection(){
            await CRUDService.insertGoal(this.newGoalCollection, this.goalsArray)
        } 
  },
  async created(){
    try{
        this.collections = await CRUDService.getGoals()
        console.log(this.collections[0].goals[0].tasks)
    }catch(err){
        this.error = err.message;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2,h3{
    font-weight: 400;
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
input[type="text"]{
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
    background: rgba(251, 215, 56, .7);
    border-radius: 10px 10px 0 0;
    padding: 7px 10px 4px 10px;
}
.goalCollection span{
    color: black;
}
.addGoal div{
    width: 100%;
}
.tasks{
    border: 5px solid rgba(251, 215, 56, .7);
}
.tasks h3{
    text-align: left;
    padding: 5px;
    background: lightgrey;
}
.tasks h3 span{
    font-weight: 600;
    margin-right: 5px;
}
.tasks button.confirm{
    width: 100%;
    border: none;
    background: rgba(251, 215, 56, .7);
    font-weight: 600;
    cursor: pointer;
}
.tasks button.confirm:hover{
    background: rgba(251, 215, 56, 1);
}
.task{
    background: white;
    padding: 5px;
    border-bottom: 2px rgba(0,0,0,.5) solid;
    text-align: left;
}
.task span{
    padding: 5px;
    font-weight: 600;
    display: inline-block;
}
.addTask{
    display: flex;
    width: 100%;
    padding: 5px;
}

.confirmation{
    border: 5px solid rgba(251, 215, 56, .7);
}
.goalResult{
    background: rgba(251, 215, 56, .7);
    padding: 5px;
    border-bottom: rgba(0,0,0,.5) 1px solid;
}
.goalResult h3,
.goalResult p{
    text-align: left;
    color: black;
    font-weight: 600;
    font-size: 18px;
}
.goalResult h3 span,
.goalResult p span{
    color: white;
    width: 35%;
    display: inline-block;
}

.addAnotherGoal{
    color: white;
    padding: 10px;
    background: rgba(0,0,0,.3);
}
.addAnotherGoal button{
    margin: 5px;
}
</style>
