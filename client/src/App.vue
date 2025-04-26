<template>
  <div class="app-container">
    <AddTodo @task-added="refreshTask"/>
    <TodoList ref="todoListRef"/>
  </div>
</template>

<script>
import TodoList from "../src/components/TodoList";
import AddTodo from "../src/components/AddTodo.vue";

export default {
  name: "App",
  components: {
    TodoList,
    AddTodo,
  },
  methods : {
    refreshTask() {
        this.$refs.todoListRef.fetchTask();
    }
  }
};
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.app-container{
 display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;  /* Set width to your preference */
  max-width: 600px;  /* This will ensure it doesn't grow too large on big screens */
  margin: 0 auto; /* Centers the container horizontally */
  padding: 20px;
  box-sizing: border-box;
  border:  1px solid black;
}
</style>
