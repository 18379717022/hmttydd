<template>
  <div class="search-container">
      <!--搜索栏-->
      <form action="/">
          <van-search 
          v-model="searchText" 
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch(searchText)"
          @cancel="$router.back()"
          @focus="isResultShow=false"></van-search>
      </form>

      <!--搜索结果-->
      <search-result v-if="isResultShow" :searchText="searchText"></search-result>

      <!--联想建议-->
      <search-suggestion 
      v-else-if="searchText" 
      :searchText="searchText"
      @search="onSearch"></search-suggestion>

      <!--搜索历史-->
      <search-history 
      v-else 
      :searchHistories="searchHistories"
      @search="onSearch"
      @update-histories="searchHistories=$event"></search-history>

      
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import {setItem,getItem} from '@/utils/storage'
//import {getSearchHistorier} from '@/api/search'
import {mapState} from 'vuex'

export default {
name:'SearchIndex',
components:{
    SearchSuggestion,
    SearchHistory,
    SearchResult
},
props:{},
data(){
    return{
        searchText:'',//搜索框输入的内容
        isResultShow:false,//控制搜索结果的显示状态
        searchHistories:[]//搜索历史数据
    }
},
computed:{
    ...mapState(['user'])
},
watch:{
    searchHistories(){
        setItem('search-histories',this.searchHistories)
    }
},
created(){
    this.loadSearchHistories()
},
mounted(){},
methods:{
    onSearch(searchText){
        //展示搜索结果
        this.isResultShow=true

        //把输入框设置成你要搜索的文本
        this.searchText=searchText

        //记录搜索历史记录
        const index=this.searchHistories.indexOf(searchText)
        if(index!==-1){
            //把重复项删除
            this.searchHistories.splice(index,1)
        }
        //把最新的搜索历史记录放到顶部(Array.unshift)
        this.searchHistories.unshift(searchText)

        //将历史记录存储到本地
        setItem('search-histories',this.searchHistories)
    },
    async loadSearchHistories(){
        const searchHistories=getItem('search-histories') ||[]
        //已登录 发请求获取用户历史记录
        //if(this.user){
         //   const{data}=await getSearchHistorier()
         //   searchHistories=[...new Set([
          //      ...searchHistories,...data.data.keywords
          //  ])]
       // }
        this.searchHistories=searchHistories
    }
}
}
</script>

<style scoped lang="less">

</style>