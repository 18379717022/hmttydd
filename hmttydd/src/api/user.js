/**

 * 用户相关的请求模块

 */

 import request from "@/utils/request"
 //在非组件模块中获取store必须通过这种方式
 //这里单独加载store,和在组件中this.$store是一个东西
 //import store from "@/store/"

 //用户登录
 export const login = data => {
   return request({
     method: 'POST',
     url: '/app/v1_0/authorizations',
     data
   })
 }

 //发送短信验证码
 export const sendSms=mobile=>{
   return request({
     method:'GET',
     url:`/app/v1_0/sms/codes/${mobile}`
   })
 }

 //获取登录用户的信息
 export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 发送请求头数据
    //headers: {
      // 注意：该接口需要授权才能访问
      //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
      //Authorization: `Bearer ${store.state.user.token}`
    //}
  })
}

//获取用户频道列表
export const getUserChannels=()=>{
  return request({
    method:'GET',
    url:'/app/v1_0/user/channels'
  })
}

//获取用户个人资料
export const getUserProfile=()=>{
  return request({
    method:'GET',
    url:'/app/v1_0/user/profile'
  })
}

//编辑用户个人资料
export const updateUserProfile=(data)=>{
  return request({
    method:'PATCH',
    url:'/app/v1_0/user/profile',
    data
  })
}

//编辑用户照片资料
export const updateUserPhoto=(data)=>{
  return request({
    method:'PATCH',
    url:'/app/v1_0/user/photo',
    data
  })
}

 