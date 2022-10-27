// search模块的小仓库
import { reqGetSearchInfo } from '@/api'
const state = {
    searchList:{}
}
const actions = {
    async getSearchList({commit},params={}){
        let result = await reqGetSearchInfo(params)
        if(result.code==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
// getters：可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    goodsList(state){
        // 如果服务器的数据回来了，没问题，是一个数组
        // 如果没网，就会return undefined
        return state.searchList.goodsList
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}