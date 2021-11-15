const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kovux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("tourism");
        const planCollection = database.collection("plans");
        
        // GET API
        app.get('/plans', async (req, res) => {
            const cursor = planCollection.find({});
            const count = await cursor.count();
            const plans = await cursor.toArray();
            res.send({
                count,
                plans
            });
        });
    }         
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.listen(port, () => {
    console.log('Listen at port:%d', port);
});