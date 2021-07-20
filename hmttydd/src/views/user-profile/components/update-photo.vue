<template>
  <div class="update-photo">
      <img :src="image" ref="image" class="img">
      <van-nav-bar 
        left-text="取消" 
        right-text="确认"
        class="bottom"
        @click-left="$emit('close')"
        @click-right="onConfirm"
      ></van-nav-bar>
  </div>
</template>

<script>
import {updateUserPhoto} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
    name:'UpdatePhoto',
    props:{
        file:{
            required:true
        }
    },
    components:{},
    data(){
        return{
            image:window.URL.createObjectURL(this.file),
            cropper:null//裁切器实例
        }
    },
    created(){},
    mounted(){
        const image=this.$refs.image
        this.cropper=new Cropper(image,{
            viewMode:1,
            dragMode:'move',
            aspectRatio:1,
            cropBoxMovable:false,
            cropBoxResizable:false,
            background:false,
            movable:true
        })
        console.log(cropper)
    },
    computed:{},
    watch:{},
    methods:{
        async onConfirm(){
            this.$toast.loading({
                message:'上传中',
                forbidClick:true,
                duration:0
            })

            const file=await this.getCroppedCanvas()

            //如果要求Content-Type是multipart/form-data,则一定要提交FormData数据对象
            //,专门用于文件上传的,不能提交{},没用
            const fd=new FormData()
            fd.append('photo',file)
            await updateUserPhoto(fd)
            //更新父组件中的用户头像
            this.$emit('update-photo',window.URL.createObjectURL(file))
            this.$toast.success('保存成功')
            //关闭弹出层
            this.$emit('close')
        },
        getCroppedCanvas(){
            return new Promise(resolve=>{
                this.cropper.getCroppedCanvas().toBlob((blob)=>{
                    resolve(blob)
                })
            })
        }
    }
}
</script>

<style scoped lang="less">
.bottom{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
}
.img{
    display: block;
    max-width: 100%;
    height: 500px;
}
</style>