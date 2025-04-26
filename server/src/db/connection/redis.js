require('dotenv').config();

const redis = require('redis');
const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    tls: false
  },
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASS
});

client.connect()
  .then(() => console.log('Connected to Redis Cloud'))
  .catch(err => console.error('Redis connection error:', err));

module.exports = client;
