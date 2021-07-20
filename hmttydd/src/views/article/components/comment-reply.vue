<template>
  <div class="comment-reply">
      <!--头部信息-->
      <van-nav-bar :title="`${comment.reply_count}条回复`">
          <van-icon name="cross" slot="left" @click="$emit('close')"></van-icon>
      </van-nav-bar>

      <!--当前评论项-->
      <comment-item :comment="comment" class="comment"></comment-item>

      <!--所有评论回复-->
      <comment-list :articleId="comment.com_id" type="c" :list="commentList"></comment-list>

      <div class="bottom">
          <van-button round @click="isPostShow=true">发布评论</van-button>
      </div>
      <van-popup position="bottom" v-model="isPostShow">
          <post-comment 
          :articleId="comment.com_id" 
          :artid="artid"
          @post-success="onPostSuccess"></post-comment>
      </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import PostComment from './post-comment'
import CommentList from './comment-list'
export default {
    name:'CommentReply',
    props:{
        comment:{
            type:Object,
            required:true
        },
        artid:{
            type:[Number,Object,String],
            required:true
        }
    },
    components:{
        CommentItem,
        PostComment,
        CommentList
    },
    data(){
        return{
            isPostShow:false,
            commentList:[]
        }
    },
    created(){},
    mounted(){},
    computed:{},
    watch:{},
    methods:{
        onPostSuccess(comment){
            //将发布成功的评论放到评论列表的顶部
            this.commentList.unshift(comment)
            //更新评论回复的数量
            this.comment.reply_count++
            //关闭发表评论的弹出层
            this.isPostShow=false
        }
    }
}
</script>

<style scoped lang="less">
.bottom{
    margin-top: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #ccc;
    .van-button{
        width: 50%;
        height: 25px;
    }
}
.comment{
    margin-bottom: 60px;
}
</style>