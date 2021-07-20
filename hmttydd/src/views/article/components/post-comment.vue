<template>
  <div class="post-comment">
      <van-field 
      v-model.trim="message"
      rows="3"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      class="textarea">
      </van-field>
      <van-button size="mini" class="publicbtn" @click="onPost" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import {addComment} from '@/api/comment'
export default {
    name:'PostComment',
    props:{
        articleId:{
            type:[Number,String,Object],
            required:true
        },
        artid:{
            type:[Number,String,Object],
            default:null
        }
    },
    components:{},
    data(){
        return{
            message:''//输入框内容
        }
    },
    created(){},
    mounted(){},
    computed:{},
    watch:{},
    methods:{
        async onPost(){
            this.$toast.loading({
                message:'发布中',
                forbidClick:true
            })
            const{data}=await addComment({
                target:this.articleId.toString(),//评论的目标id,评论文章则为文章id,对评论进行回复则为评论id
                content:this.message,//评论的内容
                art_id:this.artid?this.artid.toString():null//文章id,对评论内容发表回复时,需要传递此参数
                //表明所属文章id,对文章进行评论,不用传此参数
            })
            //处理响应结果
            this.$emit('post-success',data.data.new_obj)
            this.$toast.success('发布成功')

            //发布成功清空文本框的内容
            this.message=''
        }
    }
}
</script>

<style scoped lang="less">
.post-comment{
    display: flex;
    align-items: center;
    padding: 14px;
    .textarea{
        border: 1px solid #ccc;
        width: 80%;
        margin-right: 15px;
    }
    .publicbtn{
        width: 50px;
        height: 30px;
    }
}
</style>