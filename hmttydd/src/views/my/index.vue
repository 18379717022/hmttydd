<template>
    <div class="my-container">
        <van-cell-group class="my-info" v-if="user">
            <van-cell class="base-info" center :border="false">
                <van-image slot="icon"
                :src="currentUser.photo"
                round fit="cover"
                class="avatar" />
                <div slot="title" class="name">{{currentUser.name}}</div>
                <van-button size="small" round class="updatebtn" @click="$router.push('/user-profile/')">编辑资料</van-button>
            </van-cell>
            <van-grid :border="false" class="data-info">
                <van-grid-item class="data-info-item">
                    <div slot="text">{{currentUser.art_count}}</div>
                    <div slot="text">头条</div>
                </van-grid-item>
                <van-grid-item class="data-info-item">
                    <div slot="text">{{currentUser.follow_count}}</div>
                    <div slot="text">关注</div>
                </van-grid-item>
                <van-grid-item class="data-info-item">
                    <div slot="text">{{currentUser.fans_count}}</div>
                    <div slot="text">粉丝</div>
                </van-grid-item>
                <van-grid-item class="data-info-item">
                    <div slot="text">{{currentUser.like_count}}</div>
                    <div slot="text">获赞</div>
                </van-grid-item>
            </van-grid>
        </van-cell-group>

        <div class="not-login" v-else>
            <div class="notbox">
                <div class="mobile" @click="tologin"><i class="icon icon-shouji"></i></div>
                <div class="tologin">登录/注册</div>
            </div>
        </div>

        <van-grid :column-num="2" class="nav-grid mb-4">
            <van-grid-item icon="star-o" text="收藏" class="nav-grid-item" />
            <van-grid-item icon="browsing-history-o" text="历史" class="nav-grid-item" />
        </van-grid>

        <van-cell title="消息通知" is-link to="/"></van-cell>
        <van-cell title="小智同学" is-link to="/user-chat" class="mb-4"></van-cell>
        <van-cell title="退出登录" class="outlogin" v-if="user" @click="outlogin"></van-cell>

    </div>
</template>

<script>
import {mapState} from 'vuex'
import {getUserInfo} from '@/api/user'
export default {
    name:'MyIndex',
    components:{},
    props:{},
    data(){
        return{
            currentUser:{}//当前登录用户信息
        }
    },
    computed:{
        ...mapState(['user'])  //把user映射到本地组件中,这样就可以在当前组件像使用自己的数据一样来使用它
    },
    watch:{},
    created(){
        this.loadCurrentUser()
        console.log(this.$store.state.num)
    },
    mounted(){},
    methods:{
        tologin(){
            this.$router.push('/login')
        },
        outlogin(){
            //提示用户确认退出登录
            this.$dialog.confirm({
                title:'提示信息',
                message:'确认退出吗?'
            }).then(()=>{
                //确认退出
                //清除用户登录状态
                this.$store.commit('setUser',null)
            }).catch(()=>{
                //取消退出
            })
        },
        async loadCurrentUser(){
            try {
                const res=await getUserInfo()
                this.currentUser=res.data.data
            }catch (error) {
                console.log('请求失败')
            }
        }
    }
}
</script>

<style scoped lang="less">
.outlogin{
    text-align: center;
    color: #d86262;
    cursor: pointer;
}
.my-info{
    background-color: #007AFF;
    /deep/.van-grid-item__content{
        background-color: unset;
    }
    .data-info{
        .data-info-item{
            height: 65px;
            font-size:18px ;
            color: #fff;
        }
    }
}
/deep/.nav-grid{
        .nav-grid-item{
            height: 70px;
            .van-icon-star-o{
                color: #eb5253;
                font-size:22px;
            }
            .van-icon-browsing-history-o{
                font-size: 20px;
                color:orange;
            }
            .van-grid-item__text{
                font-size: 14px;
            }
        }
}
.base-info{
    background-color: unset;
    height: 115px;
    box-sizing: border-box;
    padding-top: 38px;
    padding-bottom: 11px;
    .avatar{
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
        box-sizing: border-box;
    }
    .name{
        font-size: 15px;
        color:#fff;
    }
    .updatebtn{
        height: 20px;
        font-size: 10px;
        color: #666666;
    }
}
.mb-4{
    margin-bottom: 4px;
}
.not-login{
    background-color: #007AFF;
    height: 176px;
    display: flex;
    align-items: center;
    justify-content: center;
    .notbox{
        display: flex;
        align-items: center;
        flex-direction: column;
        .mobile{
            background-color: #fff;
            border-radius: 50%;
            width: 66px;
            height: 66px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .icon{
                font-size: 40px;
                color: #007AFF;
            }
        }
        .tologin{
            font-size: 18px;
            color: #fff;
        }
    }
}
</style>