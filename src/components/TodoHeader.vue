<template>
  <div class="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="value" @keyup.enter="add"/>
  </div>
</template>

<script>
  export default {
    props:{
      addTodo:{
        type: Function,
        required: true
      }
    },
    data(){
      return{
        value: '',
      }
    },
    methods:{
      add(){
        //1. 获取用户输入
        const value = this.value.trim()
        //1.1 判断是否有数据
        if(!value){
          return 
        }
        //2. 创建数据---对象
        const obj = {
          id:Date.now(),
          title:value,
          isShow:false
        }
        //3. 调用传来的函数
        this.addTodo(obj)

        //清空输入框
        this.value = ""
      }
    }
  }
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>