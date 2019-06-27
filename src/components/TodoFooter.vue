<template>
  <div class="todo-footer">
    <label>
      <!-- isCheck的值就是布尔值，勾选框是否被选中？  ---选中是true，没有选中是false -->
      <input type="checkbox" v-model="isCheck"/>
    </label>
    <span>
      <span>已完成{{count}}</span> / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger" v-show="count>0">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    props:{
      todos:Array,
      checkAll:Function
    },
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
    }
  }
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}

</style>