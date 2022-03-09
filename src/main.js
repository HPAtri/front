// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import Axios from 'axios'
import App from './App'
import router from './router'
import Bus from './bus';
import axios from 'axios'
// import baseURL1 from './mock/mock'

Vue.prototype.$http = axios     // 这样设置就可以在组件内用 this.$http 使用axios了
// axios.defaults.baseURL = '' //初始化基础地址
// Vue.prototype.$Url = baseURL1
Vue.prototype.$bus = Bus;   // 在vue原型上添加$bus属性

Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.withCredentials=true//允许传递后端session

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

//通过mock构造数据来调试接口 mock js
