<template>
  <div class="comment-list">
      <van-cell title="全部评论"></van-cell>
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
          <comment-item 
          v-for="(comment,index) in list"
          :key="index"
          :comment="comment"
          @reply-click="$emit('reply-click',$event)"></comment-item>
      </van-list>
  </div>
</template>

<script>
import {getComments} from '@/api/comment'
import CommentItem from './comment-item'
export default {
    name:'CommentList',
    props:{
        articleId:{
            type:[Number,Object,String]
        },
        list:{
            type:Array,
            default:()=>[]
        },
        type:{
            type:String,
            default:'a'
        }
    },
    components:{CommentItem},
    data(){
        return{
            loading: false,
            finished: false,
            offset:null,//获取下一页数据的页码
            limit:10//每页大小
        }
    },
    created(){},
    mounted(){},
    computed:{},
    watch:{},
    methods:{
        async onLoad() {
            //1.请求获取数据
            const {data}=await getComments({
                type:this.type,//评论类型,a-对文章的评论;c-对评论的回复
                source:this.articleId.toString(),//源id,文章id或评论id
                offset:this.offset,//获取下一页数据的页码
                limit:this.limit//每页大小
            })
            //将评论总数传递给父组件
            this.$emit('update-total-count',data.data.total_count)

            //2.把数据放到列表中
            const {results}=data.data
            this.list.push(...results)
            //3.关闭本次的loading状态
            this.loading=false
            //4.判断是否还有数据
            if(results.length){
                //如果有,更新获取下一页数据的页码
                this.offset=data.data.last_id
            }else{
                //如果没有,则将finished设置为true,不再触发加载更多了
                this.finished=true
            }
        }
    }
}
</script>

<style scoped lang="less">

</style>