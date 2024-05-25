const readlineSync = require("readline-sync");
const { createConnection } = require("./adapter");
const {v4: uuid} = require('uuid');

function validateDB(db) {
  switch (db) {
    case "mongodb":
      return true;
    default:
      return false;
  }
}

async function callOperation(db, operacao) {
  let id = "";
  let titulo = "";
  let template = "";
  const connection = createConnection(db);

  switch (operacao) {
    case "insert":
      titulo = readlineSync.question("Digite o titulo a ser inserido: \n");
      template = readlineSync.question("Digite o template a ser inserido: \n");

      await connection.insert({ titulo, template });
      break;

    case "bulkInsert":
      const items = [];

      for (let i = 0; i < 1000; i++) {
        const item = {
          id: uuid(),
          titulo: 'teste',
          template: 'testeteste',
          createdAt: '2024-04-20T16:59:43.571Z',
          updatedAt: '2024-04-20T16:59:43.571Z'
        };
        items.push(item);
      }
      
      await connection.insertMany(items);
      break;

    case "select":
      id = readlineSync.question("Digite o id do documento: \n");

      await connection.select(id);
      break;

    case "selectAll":
      await connection.selectAll();
      break;

    case "update":
      id = readlineSync.question("Digite o id do documento: \n");
      titulo = readlineSync.question("Digite o titulo a ser atualizado: \n");
      template = readlineSync.question(
        "Digite o template a ser atualizado: \n"
      );

      await connection.update(id, { titulo, template });
      break;

    case "updateAll":
      await connection.updateAll();
      break;

    case "delete":
      id = readlineSync.question("Digite o id do documento: \n");

      await connection.delete(id);
      break;

    case "deleteAll":
      await connection.deleteAll();
      break;
    default:
      return false;
  }
}

let isDBValid = false;

async function start() {
  while (!isDBValid) {
    let db = readlineSync.question(
      "Digite o tipo de banco de dados a ser utilizado: \nmongodb\nredis\ncouchbase\n"
    );
    isDBValid = validateDB(db);

    if (isDBValid) {
      let operacao = readlineSync.question(
        "Digite o tipo de operação a ser utilizado: \nselect\nselectAll\ninsert\nbulkInsert\nupdate\nupdateAll\ndelete\ndeleteAll\n"
      );

      if (operacao) {
        await callOperation(db, operacao);
      }
    } else {
      console.log("banco de dados inválido por favor digite outro:\n");
    }
  }
}

start();
