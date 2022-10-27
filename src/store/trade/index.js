// trade模块的小仓库
import { reqGetUserAddress,reqGetOrderList } from "@/api"
const state = {
    address:[],
    orderInfo:[]
}

const actions = {
    async getUserAddress({commit}){
        let result = await reqGetUserAddress()
        if(result.code==200){
            commit('GETUSERADDRESS',result.data)
            return 'ok'
        }
    },

    // 获取商品清单
    async getOrderInfo({commit}){
        let result = await reqGetOrderList()
        if(result.code==200){
            commit('GETORDERINFO',result.data)
            return 'ok'
        }
    }
}

const mutations = {
    GETUSERADDRESS(state,address){
        state.address=address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    },
}

const getters = {
  
    
}
export default {
    state,
    mutations,
    actions,
    getters
}