// 路由配置信息
// 引入路由组件
import IndexHome from '../pages/Home/IndexHome.vue'
import IndexLogin from '@/pages/Login/IndexLogin'
import IndexRegister from '@/pages/Register/IndexRegister'
import IndexSearch from '@/pages/Search/IndexSearch'
import IndexDetail from '@/pages/Detail/IndexDetail'
import AddcartSuccess from '@/pages/AddcartSuccess/AddcartSuccess'
import ShopCart from '@/pages/ShopCart/ShopCart'
import IndexTrade from '@/pages/Trade/IndexTrade'
import IndexPay from '@/pages/Pay/IndexPay'
import PaySuccess from '@/pages/PaySuccess/PaySuccess'
import IndexCenter from '@/pages/Center/IndexCenter'

// 引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder/MyOrder'
import GroupOrder from '@/pages/Center/GruopOrder/GroupOrder'


export default [
    {
        path:'/home',
        component:IndexHome,
        meta:{show:true},
        name:'home'
    },
    {
        path:'/search/:keyword?',
        component:IndexSearch,
        meta:{show:true},
        name:'search',
    },
    {
        path:'/login',
        component:IndexLogin,
        meta:{show:false},
        name:'login'
    },
    {
        path:'/register',
        component:IndexRegister,
        meta:{show:false},
        name:'register'
    },
    {
        path:'/detail/:skuid',
        component:IndexDetail,
        meta:{show:true},
        name:'detail'
    },
    {
        path:'/addcartsuccess',
        component:AddcartSuccess,
        meta:{show:true},
        name:'addcartsuccess'
    },
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{show:true},
        name:'shopcart'
    },
    {
        path:'/trade',
        component:IndexTrade,
        meta:{show:true},
        name:'trade',
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 必须从购物车页面来，才能去交易页面
            if(from.path=='/shopcart'){
                next()
            }else{
                // 从哪来回哪去
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component:IndexPay,
        meta:{show:true},
        name:'pay',
        beforeEnter: (to, from, next) => {
            // 必须从交易页面来，才能去支付页面
            if(from.path=='/trade'){
                next()
            }else{
                // 从哪来回哪去
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true},
        name:'paysuccess',
        beforeEnter: (to, from, next) => {
            // 必须从支付页面来，才能去支付成功页面
            if(from.path=='/pay'){
                next()
            }else{
                // 从哪来回哪去
                next(false)
            }
        }
    },
    {
        path:'/center',
        component:IndexCenter,
        meta:{show:true},
        name:'center',
        // 二级路由
        children:[
            {
                path:'myorder',
                component:MyOrder,
                meta:{show:true},
                name:'myorder'
            },
            {
                path:'grouporder',
                component:GroupOrder,
                meta:{show:true},
                name:'grouporder'
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    // 重定向，当没有路径时，默认显示此页面
    {
        path:'',
        redirect:'/home'
    }
]