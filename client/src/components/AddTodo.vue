<template lang="">
  <div class="add-todo-container">
    <form @submit.prevent="AddTask">
      <input
        type="text"
        v-model="text"
        placeholder="Type task here..."
        required
        class="todo-input"
      />
      <button type="submit" class="add-button">Add</button>
    </form>
  </div>
</template>

<script>
import mqtt from "mqtt";

export default {
  name: "AddTodo",
  data() {
    return {
      text: "",
      client: null,
    };
  },
  mounted() {
    this.client = mqtt.connect("wss://test.mosquitto.org:8081"); 
    this.client.on("connect", () => {
      console.log("Connected to MQTT broker");
    });
    this.client.on("error", (err) => {
      console.error("MQTT connection error:", err);
    });
  },
  methods: {
    AddTask() {
      if (!this.text.trim()) return;

      const message = JSON.stringify({ task: this.text });

      this.client.publish("/add", message, (err) => {
        if (err) {
          console.error("MQTT publish error:", err);
        } else {
          console.log("Task sent via MQTT:", message);
          this.text = "";
          this.$emit("task-added");
        }
      });
    },
  },
};
</script>
<style scoped>
.add-todo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}

form {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  max-width: 600px;
}

.todo-input {
  padding: 15px;
  margin-right: 10px;
  width: 100%;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.todo-input:focus {
  outline: none;
  border-color: #4caf50;
}

.add-button {
  padding: 15px;
  width: 100px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #45a049;
}
</style>
