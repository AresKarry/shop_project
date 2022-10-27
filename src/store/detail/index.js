// detail模块的小仓库
import { reqGetGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
// 封装游客临时身份的模块，生成随机字符串，不会改变
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
}

const actions = {
    // 获取产品信息的action
    async getGoodInfo({commit}, skuId){
        let result = await reqGetGoodsInfo(skuId);
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit}, {skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        // 计入购物车成功后，服务器并没有返回需要存储的数据
        // async这个函数有返回值，是promise
        if(result.code==200){
            return 'ok'
        }else{
            // 加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    },
}

const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    },
}

const getters = {
    // 路径导航简化数据
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    // 产品信息简化数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    // 产品售卖属性简化信息
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}