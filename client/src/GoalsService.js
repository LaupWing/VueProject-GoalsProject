// This file handles all the requests
import axios from 'axios'

const url = 'http://localhost:5000/api/goals/';

class GoalService{
    // Get Posts
    static getGoals(){
        return new Promise(async (resolve, reject)=>{
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(goal=>({
                        ...goal,
                        createdAt: new Date(goal.createdAt)
                    }))
                )
            }catch(err) {
                reject(err)
            }
        })
    }

    // Create Post
    static insertGoal(goal, tasks){
        console.log(goal, tasks)
        return axios.post(url,{
            goal,
            tasks
        })
    }

    // Delete Post
    static deleteGoal(id){
        return axios.delete(`${url}${id}`)
    }
}

export default GoalService