// 登录注册模块的小仓库

import { reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLogOut } from "@/api"
import {setToken,getToken,removeToken} from '@/utils/token'

const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}

const actions = {
    // 获取验证码
    async getCode({commit},phone){
        // 不是真的发验证码，而是把验证码返回了
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'

        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    // 用户注册
    async userRegister({commit},user){
         let result = await reqUserRegister(user)
         if(result.code==200){
             commit('GETCODE',result.data)
             return 'ok'
 
         }else{
             return Promise.reject(new Error(result.message))
         }
    },

    // 用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        // console.log(result)
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'

        }else{
            return Promise.reject(new Error(result.message))
        }
    },

    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqGetUserInfo()
        // console.log(result)
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },

    // 退出登录
    async userLogout({commit}){
        // 向服务器发请求，通知清除token
        let result = await reqLogOut()
        if(result.code==200){
            commit('CLEARUSERINFO')
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    }
}

const mutations = {
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEARUSERINFO(state){
        // 把仓库相关数据清空
        state.token='',
        state.userInfo={},
        removeToken()
    }
}

const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}