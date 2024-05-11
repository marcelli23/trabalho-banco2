class RedisConnection {
    client = null;
    constructor() {
        this.client = null;
    }
    async select(id) {}
    async selectAll() {}
    async insert({titulo, template}) {}
    async update(id, {titulo, template}) {}
    async delete(id) {}
}

module.exports = RedisConnection;