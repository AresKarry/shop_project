// 对API进行统一管理
import requests from './requests'
import mockRequests from './mock'
// 三级联动接口
// /api/product/getBasecategoryList get无参数
// 发请求:axios发请求返回的结果是promise对象
export const reqCategoryList = () =>  {
    return requests({ method: 'get', url: '/api/product/getBaseCategoryList' });
}
// 获取banner首页轮播图的接口
export const reqGetBannerList = () =>  {
    return mockRequests({ method: 'get', url: '/banner' });
}

// 获取floor的数据
export const reqGetFloorList = () =>  {
    return mockRequests({ method: 'get', url: '/floor' });
}

// 获取search,/api/list,需要参数,这个参数至少是一个空对象
export const reqGetSearchInfo = (params) =>  {
    return requests({ method: 'post', url: '/api/list',data:params });
}

// 获取产品详情信息的接口
export const reqGetGoodsInfo = (skuId) =>  {
    return requests({ method: 'get', url: `/api/item/${skuId}`});
}

// 将产品添加到购物车中，或者购物车中修改产品数量
export const reqAddOrUpdateShopCart = (skuId,skuNum) =>  {
    return requests({ method: 'post', url: `/api/cart/addToCart/${skuId}/${skuNum}`});
}

// 获取购物车列表数据的接口
export const reqGetCartList = () =>  {
    return requests({ method: 'get', url: '/api/cart/cartList'});
}

// 删除购物车列产品的接口
export const reqDeleteCartById = (skuId) =>  {
    return requests({ method: 'delete', url: `/api/cart/deleteCart/${skuId}`});
}

// 修改商品选中的状态
export const reqUpdateCheckedById = (skuId,isChecked) =>  {
    return requests({ method: 'get', url: `/api/cart/checkCart/${skuId}/${isChecked}`});
}

// 获取验证码
export const reqGetCode = (phone) =>  {
    return requests({ method: 'get', url: `/api/user/passport/sendCode/${phone}`});
}

// 用户注册
export const reqUserRegister = (data) =>  {
    return requests({ method: 'post', url: '/api/user/passport/register',data});
}

// 用户登录
export const reqUserLogin = (data) =>  {
    return requests({ method: 'post', url: '/api/user/passport/login',data});
}

// 获取用户信息（带着token要0
export const reqGetUserInfo = () =>  {
    return requests({ method: 'get', url: '/api/user/passport/auth/getUserInfo'});
}

// 退出登录
export const reqLogOut = () =>  {
    return requests({ method: 'get', url: '/api/user/passport/logout'});
}

// 获取用户地址信息
export const reqGetUserAddress = () =>  {
    return requests({ method: 'get', url: '/api/user/userAddress/auth/findUserAddressList'});
}

// 获取商品清单
export const reqGetOrderList = () =>  {
    return requests({ method: 'get', url: '/api/order/auth/trade'});
}

// 提交订单的接口
export const reqSubmitOrder = (tradeNo,data) =>  {
    return requests({ method: 'post', url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,data});
}

// 获取支付信息
export const reqGetPayInfo = (orderId) =>  {
    return requests({ method: 'get', url: `/api/payment/weixin/createNative/${orderId}`});
}

// 获取支付状态信息
export const reqGetPayStatus = (orderId) =>  {
    return requests({ method: 'get', url: `/api/payment/weixin/queryPayStatus/${orderId}`});
}

// 获取个人中心的数据
export const reqGetMyOrderList = (page,limit) =>  {
    return requests({ method: 'get', url: `/api/order/auth/${page}/${limit}`});
}