<template>
  <div class="update-gender">
      <van-picker
        title="请选择性别"
        show-toolbar
        :columns="columns"
        :default-index="defaultIndex"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        @change="onChange"
      />
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
    name:'UpdateGender',
    props:{
        value:String
    },
    components:{},
    data(){
        return{
            columns: ['男','女'],
            defaultIndex:this.value
        }
    },
    created(){},
    mounted(){},
    computed:{},
    watch:{},
    methods:{
          async onConfirm(value,index){
            this.$toast.loading({
                message:'保存中...',
                forbidClick:true
            })
            try{
                //请求提交更新用户昵称
                await updateUserProfile(this.defaultIndex)
                this.$toast.success('保存成功')
                //更新成功 ,修改父组件的name,关闭弹出层
                this.$emit('close')
                this.$emit('input',this.defaultIndex)
            }catch{
                this.$toast.fail('操作失败')
            }
        },
        onChange(picker, value, index) {
          this.defaultIndex=index
        },
        
    }
}
</script>

<style scoped lang="less">

</style>