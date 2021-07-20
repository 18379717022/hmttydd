<template>
  <div class="channel-edit">
      <van-cell center :border="false">
          <div slot="title" class="channel-title">我的频道</div>
          <van-button 
          type="danger" 
          size="mini" 
          plain 
          round
          class="edit-btn"
          @click="isEdit=!isEdit"
          >{{isEdit?'完成':'编辑'}}</van-button>
      </van-cell>

      <van-grid :gutter="10">
          <van-grid-item 
          v-for="(item,index) in channels" 
          :key="index" 
          :text="item.name"
          :class="(active===index)?'grid-item active':'grid-item'"
          :icon="(isEdit&&index!==0)?'clear':''"
          @click="onUserChannelClick(channel,index)"
          ></van-grid-item>
      </van-grid>

      <van-cell center :border="false">
          <div slot="title" class="channel-title">频道推荐</div>
      </van-cell>

      <van-grid :gutter="10">
          <van-grid-item 
          v-for="(rchannel,index) in recommendChannels" 
          :key="index" 
          :text="rchannel.name"
          class="grid-item"
          @click="onAdd(rchannel)"></van-grid-item>
      </van-grid>
  </div>
</template>

<script>
import {getAllChannels,addUserChannel,deleteUserChannel} from '@/api/channel'
import {setItem} from '@/utils/storage'
import {mapState} from 'vuex'
export default {
    name:"ChannelEdit",
    components:{},
    props:{
        channels:{
            type:Array,
            required:true
        },
        active:{
            type:Number,
            required:true
        }
    },
    data(){
        return{
            allChannels:[],//所有频道数据列表
            isEdit:false
        }
    },
    created(){
        this.loadAllChannels()
    },
    mounted(){},
    methods:{
        async loadAllChannels(){
            const res=await getAllChannels()
            this.allChannels=res.data.data.channels
        },
        async onAdd(rchannel){
            this.channels.push(rchannel)
            //数据持久化
            if(this.user){
                //登录了,数据存储到(后端)
                const res=await addUserChannel({
                    channels:[
                        {
                            id:rchannel.id,
                            seq:this.channels.length
                        }
                    ]
                })
                console.log(res)
            }else{
                //没有登录,数据存储到本地
                setItem('user-channels',this.channels)
            }
        },
        onUserChannelClick(channel,index){
            if(this.isEdit&&index!==0){
                //编辑状态 删除频道
                this.deleteChannel(channel,index)
            }else{
                //切换频道
                this.switchChannel(index)
            }
        },
        async deleteChannel(channel,index){
            //如果删除的是当前激活频道之前的频道
            if(index<=this.active){
                //更新激活频道的索引
                this.$emit('update-active',this.active-1)
            }
            this.channels.splice(index,1)
            //数据持久化
            if(this.user){
                //登录了,持久化到线上
                await deleteUserChannel(channel.id)
            }else{
                //没有登录,持久化到本地
                setItem('user-channels',this.channels)
            }
        },
        switchChannel(index){
            //关闭汉堡弹出层
            this.$emit('close')
            //切换频道
            this.$emit('update-active',index)
        }
    },
    computed:{
        ...mapState(['user']),
        //推荐的频道列表
        //计算属性会观测内部依赖数据的变化而变化
        recommendChannels(){
            return this.allChannels.filter(channel=>{
                return !this.channels.find(userchannel=>{
                    return userchannel.id===channel.id
                })
            })
        }
    }
}
</script>

<style scoped lang="less">
.channel-edit{
    padding-top: 54px;
    position: fixed;
    top: 0px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow-y:auto;
    .channel-title{
        font-size: 16px;
        color: #333333;
    }
    .edit-btn{
        width: 50px;
        height: 20px;
    }
    .grid-item{
        width: 80px;
        height: 43px;
        cursor: pointer;
        /deep/.van-grid-item__content{
            background-color: #f4f5f6;
            
            .van-icon{
                font-size: 16px;
                position: absolute;
                right: -5px;
                top: -5px;
                color: #ccc;
            }
            .van-grid-item__text{
                margin-top: 0;
            }
        }
    }
    .active{
        /deep/.van-grid-item__text{
            color: red !important;
        }
    }
}
</style>