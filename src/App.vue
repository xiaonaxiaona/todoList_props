<template>
   <div class="todo-container">
    <div class="todo-wrap">
      <!-- <TodoHeader :addTodo="addTodo"/>     这个是props的形式-->  
      <TodoHeader @addTodo="addTodo"/>

      <!-- <TodoList :todos="todos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo"/>  这是props的形式-->
      <TodoList :todos="todos" />

      <!-- <TodoFooter :todos="todos" :checkAll="checkAll"/> -->
      <TodoFooter>
        <label slot="left">
            <!-- isCheck的值就是布尔值，勾选框是否被选中？  ---选中是true，没有选中是false -->
          <input type="checkbox" v-model="isCheck"/>
        </label>
        <span slot="center"> 
          <span>已完成{{count}}</span> / 全部{{todos.length}}
        </span>
        <button class="btn btn-danger" v-show="count>0" slot="right">清除已完成任务</button>
      </TodoFooter>

    </div>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'
import storage from './utils/storage'

import PubSub from 'pubsub-js'
//APP中负责各种定义与传参给其他组件，给其他组件传参都是采用的强制绑定的形式
export default {
  //computed 是 footer那边传来的，使用插槽了，所以所有的东西都要放在这边
  computed:{
    count(){
      return this.todos.reduce((pre,todo) => pre + (todo.isShow===true ? 1:0 ),0)
    },
    //设置全选的属性----有读有写操作---item都勾上，它就要勾上；它勾上，所有的item就要勾上
    isCheck: {
      get(){
        return this.todos.length === this.count && this.count > 0
      },
      set(val){
        this.checkAll(val)
      }
    }
  },
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
      todo.isShow = ! todo.isShow
    },
    //footer选中，item就要选中,传进来的值是布尔的值
    checkAll(isCheck){
      this.todos.forEach((todo)=> {todo.isShow = isCheck})
    }
  },
  //用pubsub通信--- 在mounted 中进行调用函数
  mounted(){
    // pubsub的方式
    this.token = PubSub.subscribe('deleteTodo',(msg,index) =>   //PubSub.subscribe中的回调中的参数，
                                        //要传两个，第一个值不可以省略，要不然删除时，会从，第一个开始删
      this.deleteTodo(index)

      //console.log(this)
    )

    // 事件总线的方式  绑定
    this.$bus.$on('toggleTodo',(todo)=>{
      this.toggleTodo(todo)
    })
  },
  //取消订阅
  beforeDestroy(){
    PubSub.unsubscribe(this.token)   //pubsub的形式
    this.$bus.$off("toggleTodo")   //解除绑定
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


