<template>
  <div id="app">
    <IndexHeader/>
    <!-- 路由组件展示的地方 -->
    <router-view></router-view>
    <IndexFooter v-show="$route.meta.show"></IndexFooter>
  </div>
</template>

<script>
import IndexHeader from './components/Header/IndexHeader.vue'
import IndexFooter from './components/Footer/IndexFooter.vue'

export default {
  name: 'App',
  components: {IndexHeader,IndexFooter
  },
  mounted() {
    // 派发一个action，获取商品分类的三级列表的数据
        this.$store.dispatch('categoryList')
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
