// 配置路由的地方，该文件专门用于创建整个应用的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from '@/store'


// 先把vuerouter原型对象的push/replace方法，先保存一份
let originPush = VueRouter.prototype.push;// eslint-disable-line no-unused-vars
let originReplace = VueRouter.prototype.replace;// eslint-disable-line no-unused-vars

// 重写push方法
// 第一个参数：告诉push方法，往哪里跳
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

// 配置路由
let router =  new VueRouter({
    // 配置路由
    routes,
    // 滚动性，
    scrollBehavior(to,from,savedPosition){
        // y:0代表滚动条在最上方
        return{x:0,y:0}
    }
})

// 全局路由守卫--前置守卫 
router.beforeEach(async (to,from,next)=>{
    // to：去哪，from：从哪里来， next：放行函数
    let token = store.state.user.token
    let name=store.state.user.userInfo.name
    if(token){
        // 已经登陆了，就不能去登录页面了
        if(to.path=='/login'||to.path=='/register'){
            next('/home')
        }else{
            // 登陆了，但是不去login
            // 如有用户名有，放行
            if(name){
                next()
            }else{
                // 获取用户信息，在首页展示
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了,清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
            
        }
    }else{
        // 未登录,不能去交易、支付相关的组件，不能去个人中心
        let toPath=to.path
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            // 把未登录时想去的地址存储在地址栏，登陆之后直接跳过去
            next('/login?redirect='+toPath)

        }else{
            next()
        }
    }
})

export default router