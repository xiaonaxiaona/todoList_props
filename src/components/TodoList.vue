<template>
   <ul class="todo-main">
        <!-- <TodoItem v-for="(todo,index) in todos" :key="todo.id" :index="index" :todo="todo" 
        :deleteTodo="deleteTodo" :toggleTodo="toggleTodo"/>   props的形式  -->
        <TodoItem v-for="(todo,index) in todos" :key="todo.id" :index="index" :todo="todo" />     
            
   </ul>
</template>

<script>
  import TodoItem from './TodoItem'
  export default {
    props:["todos"],
    components:{
      TodoItem
    },
    
  }
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>