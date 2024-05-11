const { MongoClient, ServerApiVersion } = require("mongodb");
const { v4: uuid } = require("uuid");

const createClient = () =>
  new MongoClient(conectionString, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

const conectionString =
  "mongodb+srv://matesmarcelli:wB2CBQAmWV2j9Ddc@cluster0.mm4r7eu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

class MongoConnection {
  client = null;
  constructor() {
    this.client = createClient();
  }

  async insert({ titulo, template }) {
    try {
      await this.client.connect();
      const database = this.client.db("Banco02");
      const collection = database.collection("trabalhoFinal");
      await collection.insertOne({
        id: uuid(),
        titulo,
        template,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } finally {
      await this.client.close();
      console.log("Dados inseridos!");
    }
  }

  async update(id, { titulo, template }) {
    try {
      await this.client.connect();
      const database = this.client.db("Banco02");
      const collection = database.collection("trabalhoFinal");
      await collection.updateOne(
        {
          id,
        },
        { $set: { titulo, template } }
      );
    } finally {
      await this.client.close();
      console.log("Dados atualizados!");
    }
  }

  async selectAll() {
    try {
      await this.client.connect();
      const database = this.client.db("Banco02");
      const collection = database.collection("trabalhoFinal");
      const result = await collection.find().toArray();

      console.log(result);
    } finally {
      await this.client.close();
    }
  }

  async select(id) {
    try {
      await this.client.connect();
      const database = this.client.db("Banco02");
      const collection = database.collection("trabalhoFinal");
      const result = await collection.findOne({
        id,
      });

      console.log(result);
    } finally {
      await this.client.close();
    }
  }

  async delete(id) {
    try {
      await this.client.connect();
      const database = this.client.db("Banco02");
      const collection = database.collection("trabalhoFinal");
      await collection.deleteOne({ id });
    } catch (e) {
      console.log("Erro: ", e.message);
    } finally {
      await this.client.close();
      console.log("Dados excluidos!");
    }
  }
}

module.exports = MongoConnection;
