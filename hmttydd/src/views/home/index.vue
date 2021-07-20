<template>
    <div class="home-container">
        <!--导航栏-->
        <van-nav-bar class="app-nav-bar">
            <van-button icon="search" 
            type="info" slot="title" 
            class="search-btn"
            round
            size="small"
            @click="ToSearch">搜索</van-button>
        </van-nav-bar>

        <!--文章频道列表-->
        <!--标签页组件有一个功能,只有你第一次查看标签页的时候才会渲染里面的内容-->
        <van-tabs v-model="active" class="channel-tabs">
            <van-tab :title="item.name" v-for="item in channels" :key="item.id">
                <!--文章列表-->
                <article-list :channel="item"></article-list>
            </van-tab>

            <!--汉堡按钮定位把列表最后的位置挡住了,需要在这里添加一个占位元素-->
            <div slot="nav-right" 
            class="wap-nav-placeholder">
            </div>

            <div slot="nav-right" 
            @click="isChannelEditShow=true"
            class="wap-nav-wrap">
                <van-icon name="wap-nav"></van-icon>
            </div>
        </van-tabs>

        <!--弹出层-->
        <van-popup 
        v-model="isChannelEditShow"
        position="bottom"
        class="channel-edit-popup"
        closeable
        close-icon-position="top-left"
        get-container="body">
            <channel-edit :channels="channels" 
            @close="isChannelEditShow=false"
            @update-active="onUpdateActive"
            :active="active"></channel-edit>
        </van-popup>
        
    </div>
</template>

<script>
import {getUserChannels} from '@/api/user.js'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import {getItem} from '@/utils/storage'
import {mapState} from 'vuex'

export default {
    name:'HomeIndex',
    components:{
        ArticleList,
        ChannelEdit
    },
    props:{
        ChannelEdit},
    data(){
        return{
            active: 0,//控制被激活的标签
            channels:[],//频道列表
            isChannelEditShow:false
        }
    },
    computed:{
        ...mapState(['user'])
    },
    watch:{},
    created(){
        this.loadChannels()
    },
    mounted(){},
    methods:{
        async loadChannels(){
            let channels=[]
            if(this.user){
                //已登录,请求获取线上的用户频道列表数据
                const res=await getUserChannels()
                channels=res.data.data.channels
            }else{
                //没有登录,判断是否有本地存储的频道列表数据
                const localChannels=getItem('user-channels')
                if(localChannels){
                    channels=localChannels
                }else{
                    //用户没有登录,也没有本地存储的频道列表数据
                    //那就请求获取默认推荐的频道列表数据
                    const res=await getUserChannels()
                    channels=res.data.data.channels
                }
            }
            this.channels=channels
        },
        onUpdateActive(index){
            this.active=index
        },
        ToSearch(){
            this.$router.push('/search')
        }
    }
}
</script>

<style scoped lang="less">
.home-container{
    /deep/.van-nav-bar__title{
        max-width: unset;
    }
    .search-btn{
        width: 277px;
        height: 32px;
        background-color: #5babfb;
        border: none;
        .van-icon{
            color: #fff;
            font-size: 16px;
            padding-top: 3px;
        }
        .van-button__text{
            font-size: 14px;
        }
    }
    .channel-tabs{
        /deep/.van-tab{
            border-right: 1px solid #edeff3;
            border-bottom: 1px solid #edeff3;
            width: 85px;
        }
        /deep/.van-tabs__line{
            width: 20px  !important;
            height: 3px;
            background: #3296fa;
            bottom: 20px;
        }
        .wap-nav-wrap{
            position: fixed;
            right: 0;
            background-color: #fff;
            width: 33px;
            height: 43px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            opacity: .9;
            .van-icon{
                font-size: 24px;
            }
        }
        .wap-nav-placeholder{
            flex-shrink: 0;
            width: 33px;
        }
    }
}
.channel-edit-popup{
    height: 100%;
}
</style>