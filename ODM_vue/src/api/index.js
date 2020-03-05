//封装接口请求函数-根据后端提供的接口文档来编写对应请求函数
import request from './ajax'

const qs = require('qs')

/**
 * 通过localstorage获取指定用户信息
 */
export function getInfo () {
    return request({
        url: '/auth/user/info',
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
        url: '/auth/login',
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

//提交用户填写的表单。并产生表单号和提交时间

//根据用户-  返回本用户下提交的所有表单号和提交时间

//根据表单号 查询表单内容

//修改表单


