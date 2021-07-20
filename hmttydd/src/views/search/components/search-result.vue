<template>
  <div class="search-result">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
          <van-cell 
          v-for="(article,index) in list" :key="index" :title="article.title" />
      </van-list>

  </div>
</template>

<script>
import {getSearchResults} from '@/api/search'

export default {
    name:'SearchResult',
    props:{
      searchText:{
        type:String,
        required:true
      }
    },
    components:{},
    data(){
        return{
            list: [],
            loading: false,
            finished: false,
            page:1,//页码
            perPage:10//每页大小
        }
    },
    created(){},
    mounted(){},
    computed:{},
    methods:{
        async onLoad() {
          //1.请求获取数据
          const{data}=await getSearchResults({
            page:this.page,//页码
            per_page:this.perPage,//每页大小
            q:this.searchText//搜索的字符
          })

          //2.将数据放到数据列表中
          const{results}=data.data
          this.list.push(...results)

          //3.关闭本次的loading
          this.loading=false
          
          //4.判断是否还有数据,有则更新获取下一页数据的页码,没有就把finished设置为true
          if(results.length){
            //有下一页数据
            this.page++
          }else{
            //没有数据了
            this.finished=true
          }
    }
  }
}
</script>

<style scoped lang="less">
.search-result{
    position: fixed;
    top: 54px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
}
</style>