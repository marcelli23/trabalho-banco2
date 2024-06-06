const { createClient } = require("redis");

class RedisConnection {
  client = createClient({
    password: "sBinxnEfvLinVEkNSZsObVDbO3Jp7NjX",
    socket: {
      host: "redis-12267.c239.us-east-1-2.ec2.redns.redis-cloud.com",
      port: 12267,
    },
  }).on("error", (err) => console.log("Redis Client Error", err));
  constructor() {}

  async select(id) {}
  async selectAll() {
    const start = performance.now();

    try {
      await this.client.connect();

      const keys = await this.client.keys("*");

      const result = {};

      for (const key of keys) {
        const type = await this.client.type(key);
        let value;

        switch (type) {
          case "string":
            value = await this.client.get(key);
            break;
          case "hash":
            value = await this.client.hgetall(key);
            break;
          case "list":
            value = await this.client.lrange(key, 0, -1);
            break;
          case "set":
            value = await this.client.smembers(key);
            break;
          case "zset":
            value = await this.client.zrange(key, 0, -1, "WITHSCORES");
            break;
          case "ReJSON-RL":
            value = await this.client.json.get(key);
            break;
          default:
            value = "Unsupported data type";
        }

        result[key] = value;
      }

      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      await this.client.disconnect();
    }

    const end = performance.now();
    console.log(`Tempo de execução: ${end - start} milisegundos`);
    return end - start;
  }

  async insert({ titulo, template }) {}
  async update(id, { titulo, template }) {}
  async delete(id) {}
}

module.exports = RedisConnection;
