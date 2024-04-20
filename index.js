const { MongoClient, ServerApiVersion } = require("mongodb");
const { v4: uuid } = require("uuid");
const conectionString =
  "mongodb+srv://matesmarcelli:wB2CBQAmWV2j9Ddc@cluster0.mm4r7eu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const createClient = () =>
  new MongoClient(conectionString, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

async function insert({ titulo, template }) {
  const client = createClient();
  try {
    console.log("inicio da inserção");
    await client.connect();
    const database = client.db("Banco02");
    const collection = database.collection("trabalhoFinal");
    await collection.insertOne({
      id: uuid(),
      titulo,
      template,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } finally {
    await client.close();
    console.log("final da inserção");
  }
}

async function select(id) {
  const client = createClient();
  try {
    console.log("inicio da consulta");
    await client.connect();
    const database = client.db("Banco02");
    const collection = database.collection("trabalhoFinal");
    return await collection.findOne({
      id,
    });
  } finally {
    await client.close();
    console.log("final da consulta");
  }
}

(async () => {
//   await insert({
//     titulo: "teste",
//     template: "testeteste",
//   });
  const result = await select("5cb476a5-6412-4764-99e6-d218a3ff9b9a");
  console.log(result);
})();
