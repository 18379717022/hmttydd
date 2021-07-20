<template>
  <div class="user-chat">
      <!--顶部区域-->
      <van-nav-bar 
        title="小智同学" 
        left-arrow 
        @click-left="$router.back()"
      ></van-nav-bar>

      <!--消息列表-->
      <van-cell-group class="messagelist">
          <van-cell :title="item" v-for="(item,index) in 20" :key="index"></van-cell>
      </van-cell-group>

      <!--发送消息-->
      <van-cell-group class="sendcontainer">
          <van-field 
            v-model="message"
            placeholder="请输入内容"
          ></van-field>
          <van-button type="primary">发送</van-button>
      </van-cell-group>


  </div>
</template>

<script>
import io from 'socket.io-client'
//建立连接
const socket=io('http://ttapi.research.itcast.cn')

socket.on('connect',function(){
    console.log('连接建立成功了')
})

//断开连接了
socket.on('disconnect',function(){
    console.log('断开连接了')
})

//发送消息
socket.emit('message',{msg:'hello',timestamp:Date.now()})

export default {
    name:'UserChat',
    props:{},
    components:{},
    data(){
        return{
            message:''
        }
    },
    computed:{},
    watch:{},
    created(){},
    mounted(){},
    methods:{}
}
</script>

<style scoped lang="less">
.messagelist{
    position: fixed;
    top: 46px;
    bottom: 44px;
    left: 0;
    right: 0;
    overflow-y: auto;
}
.sendcontainer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right:0;
    .van-button{
        width: 70px;
        height: 30px;
        color: black;
        margin-right: 20px;
    }
    
}
</style>