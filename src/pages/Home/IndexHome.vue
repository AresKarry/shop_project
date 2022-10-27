<template>
  <div>
    <!-- 使用三级联动组件，三级联动已经注册为全局组件，因此不需要引入了 -->
    <TypeNav/>
    <ListContainer/>
    <RecommendIndex/>
    <ShopRank/>
    <GuessLike/>
    <ShopFllor v-for="(floor) in floorList" :key="floor.id" :list="floor" />
    <ShopBrand/>
  </div>
</template>

<script>
  // 引入其他组件
  import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue'
  import RecommendIndex from '@/pages/Home/ReCommend/RecommendIndex.vue'
  import ShopRank from '@/pages/Home/ShopRank/ShopRank.vue'
  import GuessLike from '@/pages/Home/GuessLike/GuessLike.vue'
  import ShopFllor from '@/pages/Home/ShopFllor/ShopFllor.vue'
  import ShopBrand from '@/pages/Home/ShopBrand/ShopBrand.vue'
  import {mapState} from 'vuex'

  
  export default {
    components:{
      ListContainer,
      RecommendIndex,
      ShopRank,
      GuessLike,
      ShopFllor,
      ShopBrand
    },
    computed:{
    },
    mounted(){
      // 派发action，获取floor数据
      this.$store.dispatch('getFloorList')


      
    },
    computed:{
      ...mapState({
        floorList:(state)=>{
          return state.home.floorList
        }
      })
    },
  }
</script>

<style>

</style>