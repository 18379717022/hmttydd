<template>
  <div class="update-name">
      <!--导航栏-->
      <van-nav-bar 
        class="toptext"
        title="修改昵称" 
        left-text="取消" 
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
      >
      </van-nav-bar>

      <div style="padding:10px">
        <!--文本域-->
        <van-field 
          v-model="localName"
          autosize
          type="textarea"
          maxlength="20"
          placeholder="输入新昵称"
          show-word-limit
        ></van-field>
      </div>
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
    name:'UpdateName',
    props:{
        value:String
    },
    components:{},
    data(){
        return{
            localName:this.value
        }
    },
    computed:{},
    watch:{},
    created(){},
    mounted(){},
    methods:{
        //点击完成
        async onConfirm(){
            this.$toast.loading({
                message:'保存中...',
                forbidClick:true
            })
            try{
                //请求提交更新用户昵称
                await updateUserProfile(this.localName)
                this.$toast.success('保存成功')
                //更新成功 ,修改父组件的name,关闭弹出层
                this.$emit('close')
                this.$emit('input',this.localName)
            }catch{
                this.$toast.fail('昵称已存在')
            }
        }
    }
}
</script>

<style scoped lang="less">
.toptext{
    background-color: #fff;
    /deep/.van-nav-bar__title{
        color: black;
        font-size: 14px;
    }
}
</style>