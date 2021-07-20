import request from '@/utils/request.js'

//获取文章列表
export const getArticles=params=>{
    return request({
        method:'GET',
        url:'/app/v1_1/articles',
        params
    })
}

//获取文章详情
export const getArticleById=articleId=>{
    return request({
        method:'GET',
        url:`/app/v1_0/articles/${articleId}`
    })
}

//关注用户
export const addFollow=userId=>{
    return request({
        method:'POST',
        url:'/app/v1_0/user/followings',
        data:{
            target:userId
        }
    })
}

//取消关注
export const deleteFollow=userId=>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/user/followings/${userId}`
    })
}

//收藏文章
export const addCollect=articleId=>{
    return request({
        method:'POST',
        url:'/app/v1_0/article/collections',
        data:{
            target:articleId
        }
    })
}

//取消收藏
export const deleteCollect=articleId=>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/article/collections/${articleId}`
    })
}

//添加点赞
export const addLike=articleId=>{
    return request({
        method:'POST',
        url:'/app/v1_0/article/likings',
        data:{
            target:articleId
        }
    })
}

//取消点赞
export const deleteLike=articleId=>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/article/likings/${articleId}`
    })
}