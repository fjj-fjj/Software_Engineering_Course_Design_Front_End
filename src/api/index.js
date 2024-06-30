import request from '../utils/request'
export function getAllGoodsDetail(params) 
{
    return request.get('/label', { params })
}
export function getGoodsDetailByQuary(params)
{
    return request.get('/search', {params})
}
export function login(form)
{
    return request.post('/user/login', form)
}
export function register(form)
{
    return request.post('/user/register', form)
}
export function getCollectTableItems(params)
{
    return request.get('/user/favlist',{params})
}
export function logout()
{
    return request.get('/user/logout')
}
export function modifyPassword(params)
{
    return request.post('/user/change_password', params)
}
export function getCrawlTimeAndAllPhones(params)
{
    return request.get('/',{params})
}
export function getPhoneInfo(params)
{
    return request.get('/detail/phone', {params})
}
export function getPhoneComments(params)
{
    return request.get('/detail/comment', {params})
}
export function collectGoods(params)
{
    return request.get('/collect', {params})
}
export function deleteCollectGoods(params)
{
    return request.get('/delete_phone', {params})
}