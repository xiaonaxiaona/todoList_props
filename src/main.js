
import Vue from 'vue'
import App from './App.vue'

//添加事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  components: { App },
  template: '<App />'
})
