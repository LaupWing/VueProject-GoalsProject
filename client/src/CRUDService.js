// This file handles all the requests
import axios from 'axios'

const url = 'http://localhost:5000/api/goals/';

class CRUDService{
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
    static insertGoal(collection, goals){
        console.log(collection, goals)
        return axios.post(url,{
            collection,
            goals
        })
    }

    // Delete Post
    static deleteGoal(id){
        return axios.delete(`${url}${id}`)
    }
}

export default CRUDService