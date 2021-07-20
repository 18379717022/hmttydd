<template>
    <div class="article-list">
        <van-pull-refresh 
        v-model="isRefreshLoading" 
        @refresh="onRefresh"
        :success-text="refreshSuccessText"
        :success-duration="1500">
            <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
            <article-item 
            v-for="(item,index) in articles" 
            :key="index"
            :article="item"></article-item>
        </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import {getArticles} from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
    name:'ArticleList',
    components:{
        ArticleItem
    },
    props:{
        channel:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
             articles: [],
             loading: false,
             finished: false,
             timestamp:null,
             isRefreshLoading:false,//下拉刷新的状态
             refreshSuccessText:''//下拉刷新成功的提示文本
        }
    },
    computed:{

    },
    watch:{},
    created:{},
    mounted:{},
    methods:{
        async onLoad() {
      // 请求获取数据
        const {data}=await getArticles({
            channel_id:this.channel.id,//频道id
            timestamp:this.timestamp||Date.now(),//时间戳,请求新的推荐数据传当前的时间戳,请求历史推荐传指定的时间戳,timestamp
            //相当于页码,请求最新的数据使用当前最新时间戳,下一页数据使用上一次返回的数据中的时间戳
            with_top:1//是否包含置顶,进入页面第一次请求时要包含置顶文章,1-包含置顶,0-不包含
        })
        console.log(data)
      // 把数据放到list数组中
      const {results}=data.data
      this.articles.push(...data.data.results)
      // 设置本次加载状态结束,它可以判断是否需要加载下一次,否则它就会永远停在这里
      this.loading=false
      // 数据全部加载完成
      if(results.length){
          //更新获取下一页数据的页码
          this.timestamp=data.data.pre_timestamp
      }else{
          //没有数据了,把加载状态设置结束,不再触发加载更多
          this.finished=true
      }
    },
    async onRefresh(){
        //下拉刷新,组件自己就会展示loading状态
        //请求获取数据
        const {data}=await getArticles({
            channel_id:this.channel.id,
            timestamp:Date.now(),
            with_top:1
        })
        //把数据放到数据列表中,（往顶部追加）
        const {results}=data.data
        this.articles.unshift(...results)

        //关闭刷新的状态
        this.isRefreshLoading=false
        this.refreshSuccessText=`更新了${results.length}条数据`
    }
}
}
</script>

<style scoped lang="less">
.article-list{
    position: fixed;
    top: 90px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow-y:auto;
}
</style>