<template>
  <li @mouseenter="handleMouse(true)" @mouseleave="handleMouse(false)" :style="{backgroundColor:bgColor,color:fontColor}">
    <label>
      <!-- <input type="checkbox" v-model="todo.isShow"/>   不要在子组件中直接操作父父组件的数据-->
      <input type="checkbox" v-model="isCompleted"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isDisplay" @click="del">删除</button>
  </li>
</template>

<script>
//引入pubsub 
import PubSub from 'pubsub-js'

  export default {
    props:{
      todo:Object,
      index:Number,
      // deleteTodo:Function,    换成pubsub的形式
      //toggleTodo:Function   换成事件总线
    },
    methods:{
      del(){
        if(confirm('你确定要删除吗？')){
          //this.deleteTodo(this.index)
          PubSub.publish('deleteTodo',this.index)
        }
      },
      handleMouse(isEnter){
        if(isEnter){
          this.isDisplay= true,
          this.bgColor= "#ccc",
          this.fontColor= "yellow"
        }else{
          this.isDisplay= false,
          this.bgColor= "#fff",
          this.fontColor= "red"
        }
      }
    },
    data(){
      return{
        isDisplay: false,
        bgColor: "#fff",
        fontColor: "red"
      }
    },
    computed:{
      isCompleted:{
        get(){
          return this.todo.isShow
        },
        set(todo){

          //this.toggleTodo(this.todo)   //设置todo都被选中，传递给APP，然后footer会被选中

          this.$bus.$emit('toggleTodo',this.todo)   //消息事件总线
        }
      }
    }
  }
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>