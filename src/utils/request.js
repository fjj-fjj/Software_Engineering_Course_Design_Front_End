import axios from 'axios'
import {ElLoading} from 'element-plus'
import notification from './notification'
import router from '../router'
import useToken from '../store/token'

var loadingInstance = null
const service = axios.create({
    baseURL:'http://localhost:8080/5Gphone_war_exploded',
    withCredentials: true
})
service.interceptors.request.use(config=>{
    loadingInstance = ElLoading.service()
    if(config.data!==undefined&&(config.data.username!==undefined||config.data.pwd1!==undefined))
    {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    }
    return config
})
service.interceptors.response.use(response=>{
    loadingInstance.close()
    return response.data
}, error=>{
    loadingInstance.close()
    notification({
        message:'请求失败',
        type:'error'
    })
})
export default service


