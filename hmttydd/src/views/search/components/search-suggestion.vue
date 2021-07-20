<template>
  <div class="search-suggestion">
      <van-cell 
       icon="search" 
       class="think" 
       v-for="(suggestion,index) in suggestions"
       :key="index"
       @click="$emit('search',suggestion)"
       >
           <div slot="title" v-html="highlight(suggestion)"></div>
       </van-cell>
  </div>
</template>

<script>
import {getSearchSuggestions} from '@/api/search'
import {debounce} from 'lodash'//按需引入防抖工具函数
export default {
name:'SearchSuggestion',
components:{},
props:{
    searchText:{
        type:String,
        required:true
    }
},
data(){
    return{
        suggestions:[]//联想建议数据列表
    }
},
computed:{},
watch:{
    //属性名：要监视的数据的名称,以下是完整写法
    searchText:{
        //当数据发生变化则会执行handler处理函数,debounce是防抖工具函数
        handler:debounce(async function(){
            const {data}=await getSearchSuggestions(this.searchText)
            this.suggestions=data.data.options
        },1000),
        //该回调会在侦听开始之后被立即调用
        immediate:true
    }
},
created(){},
mounted(){},
methods:{
    highlight(suggestion){
        //正则表达式/中间的内容/都会当作正则匹配模式字符来对待
        //错误写法：/this.searchText/gi
        //RegExp是正则表达式的构造函数,参数1：字符串 参数2:匹配模式   返回值:正则对象
        return suggestion.replace(
            new RegExp(this.searchText,'gi'),
            `<span style="color:red">${this.searchText}</span>`
        )
    }
}
}
</script>

<style scoped lang="less">
.search-suggestion{
    .think{
        /deep/.van-icon{
            padding-top: 2px;
        }
    }
}
</style>