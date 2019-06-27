<template>
   <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo"/>
      <TodoList :todos="todos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo"/>
      <TodoFooter :todos="todos" :checkAll="checkAll"/>
      
    </div>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'
import storage from './utils/storage'
//APP中负责各种定义与传参给其他组件，给其他组件传参都是采用的强制绑定的形式
export default {
  components:{
    TodoHeader,
    TodoList,
    TodoFooter
  },
  data(){
    return {
      // todos:[
      //   {id:1, title:'香蕉', isShow:true },
      //   {id:2, title:'苹果', isShow:false },
      //   {id:3, title:'榴莲', isShow:true }
      // ]
      //以前data中怎么写,这里就怎么写

      //todos:JSON.parse(localStorage.getItem('todos_key')||'[]')

      todos: storage.getTodos()   //-----存在localstorage中
    }
  },
  methods:{
    addTodo(todo){ //----添加
      this.todos.unshift(todo)
    },
    deleteTodo(index){  //----删除
      this.todos.splice(index,1)
    },
    //切换选中的方法---如都选中item   下面的footer也会被选中
    toggleTodo(todo){
      todo.isShow = !todo.isShow
    },
    //footer选中，item就要选中,传进来的值是布尔的值
    checkAll(isCheck){
      this.todos.forEach((todo)=> {todo.isShow = isCheck})
    }
  },
  watch:{
    todos:{
      deep:true,  //深监视
      // handler:function(val){
      //   //已经存储了
      //    // localStorage.setItem('todos_key',JSON.stringify(val))
      //    Storage.saveTodos(val)
      // }
      handler: storage.saveTodos    //-----存在localstorage中
    }
  }
}
</script>

<style scoped>
  /*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>


