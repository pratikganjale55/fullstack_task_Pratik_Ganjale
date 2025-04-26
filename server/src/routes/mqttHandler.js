require('dotenv').config();

const mqtt = require("mqtt");
const redisClient = require("../db/connection/redis");
const taskModal = require("../db/modal/taskSchema");

const MQTT_BROKER_URL = "mqtt://test.mosquitto.org";
const REDIS_KEY = `FULLSTACK_TASK_PRATIK_GANJALE`;


const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");

  mqttClient.subscribe("/add", (err) => {
    if (err) {
      console.error("Error subscribing to /add topic:", err);
    } else {
      console.log("Subscribed to /add topic successfully");
    }
  });
});

mqttClient.on("message", async (topic, message) => {
  if (topic === "/add") {
    console.log("Received message on /add:", message.toString());

    let parsed;
    try {
      parsed = JSON.parse(message.toString());
    } catch (err) {
      console.error("Invalid JSON received:", message.toString());
      return;
    }

    const task = parsed.task;
    if (!task || typeof task !== "string") {
      console.error("Invalid task format");
      return;
    }

    try {
      let tasks = [];
      const cached = await redisClient.get(REDIS_KEY);
      if (cached) tasks = JSON.parse(cached);

      tasks.push(task);

      if (tasks.length > 50) {
        const toStore = tasks.map(t => ({ text: t, createdAt: new Date() }));
        await taskModal.create({ tasks: toStore });
        await redisClient.del(REDIS_KEY);
        console.log("Tasks saved to MongoDB and Redis cleared");
      } else {
        await redisClient.set(REDIS_KEY, JSON.stringify(tasks));
        console.log("Task stored in Redis");
      }
    } catch (error) {
      console.error("Error processing task:", error);
    }
  }
});
