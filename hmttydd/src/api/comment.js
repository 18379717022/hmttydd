import request from '@/utils/request'

//获取评论或评论回复
export const getComments=params=>{
    return request({
        method:'GET',
        url:'/app/v1_0/comments',
        params
    })
}

//对评论或回复点赞
export const addCommentLike=commentId=>{
    return request({
        method:'POST',
        url:'/app/v1_0/comment/likings',
        data:{
            commentId//评论的id
        }
    })
}

//取消对评论或回复点赞
export const deleteCommentLike=commentId=>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/comment/likings/${commentId}`
    })
}

//发布评论或回复
export const addComment=data=>{
    return request({
        method:'POST',
        url:'/app/v1_0/comments',
        data
    })
}
