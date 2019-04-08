const express       = require('express');
const mongodb       = require('mongodb');

const router        = express.Router();

// Get goals
router.get('/', async (req, res)=>{
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
})

// Add goals
router.post('/', async (req,res)=>{
    const posts = await loadPostCollection();
    await posts.insertOne({
        goal: req.body.goal,
        tasks: req.body.tasks,
        createdAt: new Date()
    });
    res.status(201).send()
})

// Delete goals
router.delete('/:id', async (req, res)=>{
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
})

async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect('mongodb://LaupWing:laupwing1@ds233596.mlab.com:33596/goals_db',{
        useNewUrlParser: true
    });

    return client.db('goals_db').collection('goals')
}
module.exports = router;