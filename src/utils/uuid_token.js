import {v4 as uuidv4} from 'uuid'
// 生成一个随机字符串，不会变化，且持久储存
export const getUUID = () => {
    // 本地存储是否有，有就用，没有生成
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    // 一定要有返回值，否则是undefined
    return uuid_token
}