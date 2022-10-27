// detail模块的小仓库
import { reqGetCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"
const state = {
    cartList:[]
}

const actions = {
    // 获取产品信息的action
    async getCartList({commit}){
        let result = await reqGetCartList();
        // console.log(result)
        if(result.code==200){
            commit('GETCARTLIST',result.data)
        }
    },
    // 删除产品
    async deleteCartListById({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code==200){
            return 'ok'
        }else{
            // 删除购物车失败
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改产品选择状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的产品
    // context：上下文对象，commit，dispatch，getters，state它都都有
    deleteAllCheckedCart({dispatch,getters}){
        // 获取购物车中的全部商品
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            if(item.isChecked==1){
                let promise = dispatch('deleteCartListById',item.skuId)
                // 将每一次返回的promise添加到数组中
                PromiseAll.push(promise)
            }
            
        }); 
        // 如果每个promise返回都成功，则成功，若有一个失败，就会返回失败结果
        return Promise.all(PromiseAll)
    },
    // 修改全部产品状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise=dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}

const getters = {
    cartList(state){
        return state.cartList[0]||{}
    },
    
}
export default {
    state,
    mutations,
    actions,
    getters
}