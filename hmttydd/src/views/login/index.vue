<template>
    <div class="login-container">
        <van-nav-bar title="登录/注册" left-arrow @click-left="onClickLeft" />
        <!--登录表单-->
        <van-form @submit="onLogin" 
        :show-error="false" 
        :show-error-message="false"
        validate-first
        ref="login-form"
        @failed="onFailed">
            <van-field
            v-model="user.mobile"
            icon-prefix="icon"
            left-icon="shouji"
            name="mobile"
            center
            :rules="formRules.mobile"
            placeholder="请输入手机号"
             />

            <van-field
            v-model="user.code"
            icon-prefix="icon"
            left-icon="yanzhengma"
            name="code"
            center
            :rules="formRules.code"
            placeholder="请输入验证码">
              <template #button>
                  <van-button v-if="isCountDownShow" size="small" 
                  round class="send-btn" 
                  @click.prevent="onSendSms"
                  :loading="isSendSmsLoading">验证码</van-button>
                  <van-count-down v-else @finish="isCountDownShow=true" :time="1000*60" format="ss s" />
              </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button type="info" block class="login-btn">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { login,sendSms } from '@/api/user'

export default {
    name:'LoginIndex',
    components:{},
    props:{},
    data(){
        return{
            user:{
                mobile:'',//手机号
                code:''//验证码
            },
            formRules:{
                mobile:[
                    {required:true,message:'请输入手机号'},
                    {pattern:/^1[3|5|7|8|9]\d{9}$/,message:'手机号格式错误'}
                ],
                code:[
                    {required:true,message:'请输入验证码'},
                    {pattern:/^\d{6}$/,message:'验证码格式错误'}
                ]
            },
            isCountDownShow:true,//控制倒计时的显示与隐藏
            isSendSmsLoading:false//发送验证码按钮的loading状态
        }
    },
    computed:{},
    watch:{},
    created(){},
    mounted(){},
    methods:{
        onClickLeft(){
            this.$router.back()
        },
        onFailed(error){
            if(error.errors[0]){
                this.$toast({
                    message:error.errors[0].message,
                    position:'top'
                })
            }
        },
        async onSendSms(){
            //校验手机号是否合法
            try {
               await this.$refs['login-form'].validate('mobile')
               //验证手机号通过 请求发送验证码
               this.isSendSmsLoading=true
               const res=await sendSms(this.user.mobile)
               console.log(res)
               //短信发出去了,显示倒计时
               this.isCountDownShow=false
            } catch (err) {
               //try里面任何的错误都会进入catch
               //不同的错误需要有不同的提示,那就需要判断了
               let message=''
               if(err&&err.response&&err.response.status===429){
                   //发送短信失败的错误提示
                   message='发送太频繁了,请1分钟后重试'
               }else if(err.name==='mobile'){
                   //表单验证失败的错误提示
                   message=err.message
               }else{
                   //未知错误
                   message='发送失败,请稍后重试'
               }
               //提示用户
                this.$toast({
                    message,
                    position:'top'
                })
            }
            //无论发送验证码失败还是成功,都应该关闭Loading状态
            this.isSendSmsLoading=false
        },
        async onLogin () {
            this.$toast.loading({
                message:'登录中',
                forbidClick:true,
                duration:0
            })
            try{
                const res=await login(this.user)
                this.$toast.success('登录成功')
                //将后端返回的用户登录状态(token等数据)放到Vuex容器中
                //提交mutations,修改state中的值
                this.$store.commit('setUser',res.data.data)
                //登录成功 跳转回我的页面
                this.$router.back()
                console.log(res)
            }catch(err){
                if(err.response.status===400){
                    this.$toast.fail('登录失败,手机号或验证码错误!')
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
.login-btn-wrap{
    padding: 26px 16px;
}
.login-btn{
    background-color: #6db4fb;
    border: none;
}

.van-field__button{
    .van-button{
        .van-button__content{
            .van-button__text{
                font-size: 11px;
                color: #666666;
            }
        }
    }
}
.login-btn-wrap{
    .login-btn{
        .van-button__content{
            .van-button__text{
                font-size: 15px;
            }
        }
    }
}

.van-form{
    .van-cell{
            display: flex;
            justify-content: center;
            align-items: center;
        .van-field__left-icon{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .van-cell__value{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
.send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
}
.van-field__button .van-button .van-button__content .van-button__text{
    font-size: 6px;
}
</style>