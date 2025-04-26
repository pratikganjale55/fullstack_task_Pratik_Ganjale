<template lang="">
  <div class="todo-list-container">
    <h2>Notes</h2>
    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        {{ task }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TodoList",
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    this.fetchTask();
  },
  methods: {
    async fetchTask() {
      try {
        let res = await axios.get("http://localhost:5000/fetchAllTasks");
        this.tasks = res?.data?.tasks;
        console.log(res);
      } catch (error) {
        console.log("Error getting tasks:", error);
      }
    },
  },
};
</script>

<style scoped>
.todo-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  height: 100vh; 
  overflow-y: auto;
  
}

h2 {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

ul {
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 600px; 
}

.task-list {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.task-item {
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  color: #444;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.task-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.task-item:last-child {
  margin-bottom: 0;
}
</style>
