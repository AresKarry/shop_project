// home模块的小仓库

import { reqCategoryList,reqGetBannerList,reqGetFloorList } from "@/api"

const state = {
    // 服务器返回对象就写对象，返回数组就【根据接口的返回值初始化】
    categoryList:[],
    // 轮播图
    bannerList:[],
    // 
    floorList:[]
}

const actions = {
    // 通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        // console.log(result)
        if(result.code==200){
            commit("CATEGORYLIST",result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        // console.log(result)
        if(result.code==200){
            commit("GETBANNERLIST",result.data)
        }
    },
    // 获取floor的数据
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        // console.log(result)
        if(result.code==200){
            commit("GETFLOORLIST",result.data)
        }
    },
}

const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    },
}

// getters：可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}