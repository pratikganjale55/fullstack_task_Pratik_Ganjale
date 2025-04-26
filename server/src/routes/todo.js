require('dotenv').config();
const Router = require("express");
const todoRouter = Router();
const taskModal = require("../db/modal/taskSchema");
const client = require("../db/connection/redis");
const REDIS_KEY = `FULLSTACK_TASK_PRATIK_GANJALE`;

todoRouter.get("/fetchAllTasks", async (req, res) => {
    try {
      const cached = await client.get(REDIS_KEY);
      const tasks = cached ? JSON.parse(cached) : [];
      return res.status(200).json({ tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

todoRouter.post("/add", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task || typeof task !== "string") {
      return res.status(400).json({ error: "Task must be a non-empty string" });
    }
    let tasks = [];
 
    const cached = await client.get(REDIS_KEY);
    console.log(cached)
    if (cached) {
      tasks = JSON.parse(cached);
    } 
    tasks.push(task);
    if (task.length > 50) {
      const tasksWithTimestamps = tasks.map((t) => ({
        text: t,
        createdAt: new Date(),
      }));
      await taskModal.create({ tasks: tasksWithTimestamps })
      await client.del(REDIS_KEY);
    }else {
        await client.set(REDIS_KEY, JSON.stringify(tasks));
    }
    return res.status(200).json({ message: "Task added successfully" });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = todoRouter;
