<template>
  <div class="update-birthday">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="coConfirm"
      />
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
    name:'UpdateBirthday',
    props:{
        value:String
    },
    components:{},
    data(){
        return{
            minDate: new Date(1990, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value)
        }
    },
    created(){

    },
    mounted(){},
    computed:{},
    watch:{},
    methods:{
        async coConfirm(){
            //请求提交,更新用户生日
            this.$toast.loading({
                message:'保存中...',
                forbidClick:true
            })
            try{
                const newBirthday=`${this.currentDate.getFullYear()}-${
                    this.currentDate.getMonth()+1}-${this.currentDate.getDay()}`
                //请求提交更新用户生日
                await updateUserProfile(newBirthday)
                this.$toast.success('保存成功')
                //更新成功 ,修改父组件的name,关闭弹出层
                this.$emit('close')
                this.$emit('input',newBirthday)
            }catch{
                this.$toast.fail('操作失败')
            }
            //关闭弹出层
            this.$emit('close')
        }
    }
}
</script>

<style scoped lang="less">

</style>