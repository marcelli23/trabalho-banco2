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
    const start = performance.now();
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
    const end = performance.now();
    console.log(`Tempo de execução: ${end - start} milisegundos`);
    return end - start; 
  }

  async insertMany(items) {
    const start = performance.now();
    try {
      await this.client.connect();
      const database = this.client.db("Banco02");
      const collection = database.collection("trabalhoFinal");
      await collection.insertMany(items);
    } finally {
      await this.client.close();
      console.log("Dados inseridos!");
    }
    const end = performance.now();
    console.log(`Tempo de execução: ${end - start} milisegundos`);
    return end - start; 
  }

  async update(id, { titulo, template }) {
    const start = performance.now();
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
    const end = performance.now();
    console.log(`Tempo de execução: ${end - start} milisegundos`);
    return end - start; 
  }

  async updateAll() {
    const start = performance.now();
    try {
      await this.client.connect();
      const database = this.client.db("Banco02");
      const collection = database.collection("trabalhoFinal");
      await collection.updateMany({}, { $set: { titulo: 'Titulo Bulk Update', template: 'Template Bulk Update' } });
    } finally {
      await this.client.close();
      console.log("Dados atualizados!");
    }
    const end = performance.now();
    console.log(`Tempo de execução: ${end - start} milisegundos`);
    return end - start; 
  }

  async selectAll() {
    const start = performance.now();
    try {
      await this.client.connect();
      const database = this.client.db("Banco02");
      const collection = database.collection("trabalhoFinal");
      const result = await collection.find().toArray();

      console.log(result);
    } finally {
      await this.client.close();
    }
    const end = performance.now();
    console.log(`Tempo de execução: ${end - start} milisegundos`);
    return end - start; 
  }

  async select(id) {
    const start = performance.now();
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
    const end = performance.now();
    console.log(`Tempo de execução: ${end - start} milisegundos`);
    return end - start; 
  }

  async delete(id) {
    const start = performance.now();
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
    const end = performance.now();
    console.log(`Tempo de execução: ${end - start} milisegundos`);
    return end - start; 
  }
  
  async deleteAll() {
    const start = performance.now();
    try {
      await this.client.connect();
      const database = this.client.db("Banco02");
      const collection = database.collection("trabalhoFinal");
      await collection.deleteMany({});
    } catch (e) {
      console.log("Erro: ", e.message);
    } finally {
      await this.client.close();
      console.log("Dados excluidos!");
    }
    const end = performance.now();
    console.log(`Tempo de execução: ${end - start} milisegundos`);
    return end - start; 
  }
}

module.exports = MongoConnection;
