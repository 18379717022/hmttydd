<template>
  <div class="article-container">
      <!--导航栏-->
      <van-nav-bar 
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()">
      </van-nav-bar>

      <div class="article-wrap">
          <h1 class="title">{{article.title}}</h1>

      <van-cell center class="user-info">
          <div slot="title" class="name">{{article.aut_name}}</div>
          <div slot="label" class="pubdate">{{article.pubdate | relativeTime}}</div>

          <van-image
          slot="icon"
          width="35"
          height="35"
          round
          class="avatar"
          :src="article.aut_photo"></van-image>

          <van-button 
          round 
          size="small" 
          :type="article.is_followed ?'default':'info'" 
          class="follow-btn"
          :icon="article.is_followed ?'':'plus'"
          @click="onFollow"
          :loading="isFollowLoading"
          >{{article.is_followed?'已关注':'关注'}}</van-button>
      </van-cell>

      <!--文章内容-->
      <div 
      class="content markdown-body" 
      v-html="article.content"
      ref="article-content"></div>

      <!--评论列表-->
      <comment-list 
      :articleId="articleId" 
      :list="commentList"
      @update-total-count="totalCommentCount=$event"
      @reply-click="onReplyClick"></comment-list>
      </div>

      <!--底部区域-->
      <div class="article-bottom">
          <van-button 
          class="comment-btn"
          type="default"
          round
          size="small"
          @click="isPostShow=true">写评论</van-button>

          <van-icon 
          name="comment-o"
          :info="totalCommentCount"
          color="#777"></van-icon>

          <van-icon 
          :color="article.is_collected?'orange':'#777'"
          :name="article.is_collected?'star':'star-o'"
          @click="onCollect"></van-icon>

          <van-icon 
          :color="article.attitude===1?'red':'#777'"
          :name="article.attitude===1?'good-job':'good-job-o'"
          @click="onLike"></van-icon>

          <van-icon name="share" color="#777777"></van-icon>
      </div>

      <!--发布评论-->
      <van-popup 
      v-model="isPostShow" 
      position="bottom" 
      >
          <post-comment :articleId="articleId" @post-success="onPostSuccess"></post-comment>
      </van-popup>

      <!--评论回复-->
      <van-popup 
      v-model="isReplyShow"
      position="bottom"
      >
          <comment-reply 
          :comment="replyComment" 
          @close="isReplyShow=false"
          v-if="isReplyShow"
          :artid="articleId"></comment-reply>
      </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import {
    getArticleById,
    addFollow,
    deleteFollow,
    addCollect,
    deleteCollect,
    addLike,
    deleteLike} from '@/api/article'
import {ImagePreview} from 'vant'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment'
import CommentReply from './components/comment-reply'

export default {
    name:'ArticleIndex',
    components:{
        CommentList,
        PostComment,
        CommentReply
    },
    props:{},
    data(){
        return{
            articleId:'',//文章id
            article:{},//文章数据对象
            isFollowLoading:false,//关注用户的按钮Loading状态
            isPostShow:false,//控制发布评论的显示状态
            commentList:[],
            totalCommentCount:0,//评论总数
            isReplyShow:false,//控制回复评论的显示状态
            replyComment:{}//当前回复评论对象
            
        }
    },
    created(){
        this.articleId=this.$route.params.articleId
        this.loadArticle()
    },
    mounted(){},
    computed:{},
    watch:{},
    methods:{
        async loadArticle(){
            const {data}=await getArticleById(this.articleId)
            this.article=data.data

            //数据改变影响视图更新(DOM数据)不是立即的
            //所有如果需要在修改数据之后马上操作被该数据影响视图的DOM,需要把这个代码放到$nextTick中
            //this.$nextTick是vue提供的方法
            this.$nextTick(()=>{
                this.handlePerviewImage()
            })
        },
        handlePerviewImage(){
            //获取文章内容DOM容器
            const articleContent=this.$refs['article-content']
            //得到所有的img标签
            const imgs=articleContent.querySelectorAll('img')
            //在事件处理函数中调用ImagePreview()预览图片
            const imgPaths=[]
                imgs.forEach((img,index)=>{
                    imgPaths.push(img.src)
                    //循环img列表,给img注册点击事件
                    img.onclick=function(){
                        ImagePreview({
                            images:imgPaths,
                            startPosition:index
                        })
                    }
                })
        },
        async onFollow(){
            this.isFollowLoading=true
            //已关注,取消关注
            if(this.article.is_followed){
                await deleteFollow(this.article.aut_id)
            }else{
                //没有关注,添加关注
                await addFollow(this.article.aut_id)
            }
            this.article.is_followed=!this.article.is_followed
            this.isFollowLoading=false
        },
        async onCollect(){
            this.$toast.loading({
                message:'操作中...',
                forbidClick:true//禁止背景点击
            })
            //已收藏,取消收藏
            if(this.article.is_collected){
                await deleteCollect(this.articleId)
            }else{
                //没有收藏,加入收藏
                await addCollect(this.articleId)
            }
            this.article.is_collected=!this.article.is_collected
            this.$toast.success(`${this.article.is_collected?'':'取消'}收藏成功`)
        },
        async onLike(){
            this.$toast.loading({
                message:'操作中...',
                forbidClick:true
            })
            //已点赞,取消点赞
            if(this.article.attitude===1){
                await deleteLike(this.articleId)
                this.article.attitude=-1
            }else{
                //未点赞,添加点赞
                await addLike(this.articleId)
                this.article.attitude=1
            }
            this.$toast.success(`${this.article.attitude===1?'':'取消'}点赞成功`)
        },
        onPostSuccess(comment){
            //把发布成功的评论数据对象放到评论列表顶部,xx.unshift(comment)
            this.commentList.unshift(comment)

            //关闭发布评论弹出层
            this.isPostShow=false

            //更新评论的总数量
            this.totalCommentCount++
        },
        onReplyClick(comment){
            this.isReplyShow=true
            this.replyComment=comment
        }
    }
}
</script>

<style scoped lang="less">
.title{
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
}
.article-wrap{
    position: fixed;
    top: 46px;
    bottom: 40px;
    left: 0;
    right: 0;
    overflow-y: auto;
}
.user-info{
    .name{
        font-size: 12px;
        color: #333333;
    }
    .pubdate{
        font-size: 12px;
        color: #b4b4b4;
    }
    .avatar{
        margin-right: 8px;
        width: 35px;
        height: 35px;
    }
    .follow-btn{
        width: 85px;
        height: 29px;
    }
}
.content{
    padding: 14px;
    background-color: #fff;
}
.article-bottom{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .comment-btn{
        width: 130px;
        height: 25px;
    }
    .van-icon{
        font-size: 19px;
    }
    .van-icon-comment-o{
        .van-info{
            font-size: 8px;
        }
    }

}
</style>