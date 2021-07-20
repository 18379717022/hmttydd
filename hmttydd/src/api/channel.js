import request from '@/utils/request.js'

//获取所有频道
export const getAllChannels=()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/channels'
    })
}

//修改用户频道列表(部分覆盖)
export const addUserChannel=data=>{
    return request({
        method:'PATCH',
        url:'/app/v1_0/user/channels',
        data
    })
}

//删除用户指定频道
export const deleteUserChannel=channelId=>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/user/channels/${channelId}`
    })
}
