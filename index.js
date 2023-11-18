const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3300;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAMEUSER}:${process.env.DB_PASSCODE}@rubelauto.ldksgrl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    app.get("/", (req, res) => {
      res.send("Sarver RUnning");
    });

    const database = client.db("bheramaraDB").collection("customer");

    app.get("/customers", async (req, res) => {
      const result = await database.find().toArray();
      res.send(result);
    });

    app.get("/customers/:cardNo", async (req, res) => {
      const noCard = req.params.cardNo;
      const query = { cardno: noCard };
      const result = await database.findOne(query);
      res.send(result);
    });

    app.put("/payment/:cardNo", async (req, res) => {
      const inslattment = req.body;
      const noCard = req.params.cardNo;

      const query = { cardno: noCard };
      const updateDoc = {
        $push: { installment: inslattment },
      };

      const result = await database.updateOne(query, updateDoc);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Surver Running on Port ${port}`);
});
