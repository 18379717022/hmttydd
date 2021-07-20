<template>
  <van-cell class="comment-item">
      <van-image 
      width="36"
      height="36"
      round
      slot="icon"
      :src="comment.aut_photo"
      class="userimg"
    ></van-image>

    <div slot="title">
        <div class="topname">
            <div class="name">{{comment.aut_name}}</div>
            <div class="goodjob" @click="onCommentLike">
                <van-icon 
                :name="comment.is_liking ? 'good-job' : 'good-job-o'"
                :class="{islike:comment.is_liking}"
                ></van-icon>
                <span>{{comment.like_count}}</span>
            </div>
        </div>
        
        <div class="content">{{comment.content}}</div>
        <div class="timeanser">
            <span>{{comment.pubdate | datetime('MM-DD HH:mm')}}</span>
            <van-button 
            round size="mini" 
            class="anserbtn"
            @click="$emit('reply-click',comment)">{{comment.reply_count}} 回复</van-button>
        </div>
    </div>

    
  </van-cell>
</template>

<script>
import {addCommentLike,deleteCommentLike} from '@/api/comment'
export default {
    name:'CommentItem',
    props:{
        comment:{
            type:Object
        }
    },
    components:{},
    data(){
        return{}
    },
    created(){},
    mounted(){},
    computed:{},
    watch:{},
    methods:{
        async onCommentLike(){
            const commentId=this.comment.com_id.toString()
            //已点赞,取消点赞
            if(this.comment.is_liking){
                await deleteCommentLike(commentId)
                this.comment.like_count--
            }else{
                //未点赞,添加点赞
                await addCommentLike(commentId)
                this.comment.like_count++
            }
            //更新视图
            this.comment.is_liking=!this.comment.is_liking
        }
    }

}
</script>

<style scoped lang="less">
.comment-item{
    .userimg{
        margin-right: 10px;
        width: 36px;
        height: 36px;
    }
    .anserbtn{
        width: 50px;
        height: 20px;
    }
    .van-icon{
        font-size: 20px;
    }
    .timeanser{
        display: flex;
        align-items: center;
        span{
            font-size: 10px;
        }
    }
    .name{
        font-size: 14px;
        color: #406599;
    }
    .content{
        font-size: 16px;
        color: #222222;
    }
    .goodjob{
        display: flex;
        align-items: center;
    }
    .topname{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .islike{
        color: red;
    }
}
</style>