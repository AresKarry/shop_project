// 引入vue
import Vue from 'vue'
// 引入APP组件
import App from './App.vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'
// 
import axios from 'axios';
import { Button,MessageBox } from 'element-ui';
Vue.prototype.$axios = axios;
// 关闭生产提示
Vue.config.productionTip = false
// 应用vue-router
Vue.use(VueRouter)


// 引入仓库
import store from "@/store"
// 三级联动的组件-----注册为全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import IndexCarousel from '@/components/Carousel/IndexCarousel.vue'
import IndexPagination from '@/components/Pagination/IndexPagination.vue'
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(IndexCarousel.name,IndexCarousel)
Vue.component(IndexPagination.name,IndexPagination)

// elementUI注册的两种写法
Vue.component(Button.name,Button)
Vue.prototype.$msgbox=MessageBox
Vue.prototype.$alert=MessageBox.alert



// 引入MockServer.js
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接收api文件夹里面全部请求的函数
import * as API from '@/api'
import karry from '@/assets/images/1.gif'
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload,{
  loading:karry
})


// 使用自定义插件
import myPlugins from './plugins/myPlugins';
Vue.use(myPlugins,{
  name:'karry'
})

// 创建vm
new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API

  },
  // 注册路由信息
  router:router,
  // 注册仓库，组件实例的身上会多了$store这个属性
  store
}).$mount('#app')
