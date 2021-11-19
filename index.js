const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kovux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async () => {
    try {
        await client.connect();
        const database = client.db("tourism");
        
        const planCollection = database.collection("plans");
        const userCollection = database.collection("users");
        
        // GET API
        // plans
        app.get('/plans', async (req, res) => {
            const limit = parseInt(req.query.limit);
            const page = parseInt(req.query.page) || 0;
            const toSkip = limit * page;

            const cursor = planCollection.find({});
            const count = await cursor.count();
            
            let plans;
            if (limit) {
                plans = await cursor.skip(toSkip).limit(limit).toArray();
            }
            else {
                plans = await cursor.toArray();
            }
            
            res.send({
                count,
                plans
            });
        });

        // GET single plan
        app.get('/plans/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await planCollection.findOne(query);
            res.json(result);
        });

        // users
        app.get('/users', async (req, res) => {
            const userEmail = req.query.email;
            const query = { email: userEmail };
            const cursor = userCollection.find(query);

            const user = await cursor.toArray();
            res.send(user);
        });
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running tourism server');
});

app.listen(port, () => {
    console.log('Listen at port:%d', port);
});