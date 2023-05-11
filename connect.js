const { MongoClient, ServerApiVersion } = require("mongodb");

require('dotenv').config();

// Replace the placeholder with your Atlas connection string
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSER_URL}.dzdhppv.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function run() {
    try {
      await client.connect();

      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
      // Select the sample_airbnb database
      const db = client.db('sample_airbnb');
  
      // List all collections in the sample_airbnb database
      const collections = await db.listCollections().toArray();
      console.log('Collections:', collections.map(c => c.name));
    } catch (err) {
        console.log(err);
    } finally {
      await client.close();
    }
  }
  
  run().catch(console.dir);
