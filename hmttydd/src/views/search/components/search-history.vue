<template>
  <div class="search-history">
      <van-cell title="历史记录">
          <div v-if="isDeleteShow">
              <span @click="$emit('update-histories',[])">全部删除</span>
              &nbsp;&nbsp;
              <span @click="isDeleteShow=false">完成</span>
          </div>
          <van-icon 
          name="delete" 
          v-else
          @click="isDeleteShow=true">
          </van-icon>
      </van-cell>

      <van-cell 
      :title="history" 
      v-for="(history,index) in searchHistories" 
      :key="index"
      @click="onDelete(history,index)">
          <van-icon name="close" v-show="isDeleteShow"></van-icon>
      </van-cell>
  </div>
</template>

<script>
import {setItem} from '@/utils/storage'

export default {
    name:'SearchHistory',
    components:{},
    props:{
        searchHistories:{
            type:Array,
            required:true
        }
    },
    data(){
        return{
            isDeleteShow:false//控制删除图标的显示状态
        }
    },
    computed:{},
    created(){},
    mounted(){},
    methods:{
        onDelete(history,index){
            //如果是删除状态,则执行删除操作
            if(this.isDeleteShow){
                this.searchHistories.splice(index,1)
                //持久化到本地
                setItem('search-histories',this.searchHistories)
                return 
            }
            //非删除状态,展示搜索结果
            this.$emit('search',history)
        }
    }
}
</script>

<style scoped lang="less">

</style>