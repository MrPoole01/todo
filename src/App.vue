<template>
  <div id="app">
    <div class="container">
      <Header />
      <AddTodo v-on:add-todo="addTodo"  />
      <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
    </div>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue';
import Todos from './components/Todos.vue';
import AddTodo from './components/AddTodo.vue';
import axios from 'axios';

export default {
  name: 'app',
  components: {
    Header,
    Todos,
    AddTodo
  },
  data() {
    return {
      todos: []
    }
  },
  methods: {
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id != id);
    },
    addTodo(newTodo) {
      
      this.todos = [...this.todos, newTodo];
    }
  },
  created() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=9')
      .then(res => this.todos = res.data)
       /* eslint-disable */
      .catch(err => console.log(err));
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0;
    /*width: 500px;*/
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }

  .container {
    width: 500px;
  }

  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }

</style>
