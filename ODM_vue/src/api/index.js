//封装接口请求函数-根据后端提供的接口文档来编写对应请求函数
import request from './axios'

const qs = require('qs')

/**
 * 通过localstorage获取指定用户信息
 */
export function getInfo () {
    return request({
        url: '',
        method: 'get'
    })
}

/**
 *  修改用户信息
 */
export function modifyInfo (data) {
    // console.log(data)
    return request({
        url: '/auth/update',
        method: 'post',
        data: qs.stringify(data)
    })
}

//登陆，返回用户信息及uuid，session等
export function accountLogin(data){
    return request({
        url: 'https://www.fastmock.site/mock/882ad31d909453b04049aa07c5c2066f/ODM/api/login',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function accountLogout() {
        return request({
            url: '/auth/logout',
            method: 'post'
        })
}
export function accountRegister(data) {
        return request({
            url: '/auth/register',
            method: 'post',
            data: qs.stringify(data)
        })
}



//根据用户首页选择类目获取属性及选项类型
export function getAttributes(data) {
    return request({
        url: 'https://www.fastmock.site/mock/882ad31d909453b04049aa07c5c2066f/ODM/api/getattributes',
        method: 'post',
        data: qs.stringify(data)
    })
}
//提交用户填写的表单。并产生表单号和提交时间


//根据用户-  返回本用户下提交的所有表单号和提交时间
export function getAllSubmit(data) {
    return request({
        //url: 'https://www.fastmock.site/mock/882ad31d909453b04049aa07c5c2066f/ODM/api/getAllSubmit',
        url: 'api/getAllSubmit',
        method: 'post',
        data: qs.stringify(data)
    })
}

//根据表单号 查询表单内容
export function lookForm(data) {
    return request({
        url: 'https://www.fastmock.site/mock/882ad31d909453b04049aa07c5c2066f/ODM/api/lookForm',
        method: 'post',
        data: qs.stringify(data)
    })
}
//修改表单
export function editForm(data) {
    return request({
        url: 'https://www.fastmock.site/mock/882ad31d909453b04049aa07c5c2066f/ODM/api/editForm',
        method: 'post',
        data: qs.stringify(data)
    })
}

