// 需要对axios进行二次封装
import axios from 'axios'
// 在当前模块中引入store
import store from '@/store'
// 引入进度条
import nprogress from 'nprogress'
// start:进度条开始的方法 done:进度条结束的方法
// 引入进度条样式
import "nprogress/nprogress.css"


// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是配置之后axios
// config.headers.Authorization=`Beaer ${token}`
// axios.defaults.baseURL="http://localhost:8090"

const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候路径中会出现api
    baseURL: "/api",
    // 代表请求超时的时间，单位：毫秒
    timeout:5000,
})
// 请求拦截器：在请求发送之前，请求拦截器可以检测到，可以在请求之前做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，header请求头
    // 进度条开始动
    if(store.state.detail.uuid_token){
        // 给请求头添加一个字段，字段名不能随机，要和后端商量
        config.headers.userTempId=store.state.detail.uuid_token
    }
    // 携带token
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    nprogress.start()
    return config
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测到
    // 进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    // 响应失败回调函数
    return Promise.reject(new Error('faile'))
})

// 对外暴露
export default requests;