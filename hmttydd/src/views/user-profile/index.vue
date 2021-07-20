<template>
  <div class="user-profile">
      <!--导航栏-->
      <van-nav-bar 
        title="个人信息" 
        left-arrow 
        @click-left="$router.back()"
      ></van-nav-bar>

      <!--选择文件-->
      <input type="file" hidden ref="file" accept="image/*" @change="onFileChange" />

      <!--编辑项-->
      <van-cell 
        title="头像" 
        is-link 
        center
        @click="$refs.file.click()">
          <van-image 
            width="30" 
            height="30" 
            round fit="cover" 
            :src="user.photo"
          ></van-image>
      </van-cell>
      <van-cell 
        title="昵称" 
        :value="user.name" 
        is-link
        @click="isEditNameShow=true"
      ></van-cell>
      <van-cell 
        title="性别" 
        :value="user.gender===1?'女':'男'" 
        is-link
        @click="isEditGenderShow=true"
      ></van-cell>
      <van-cell 
        title="生日" 
        :value="user.birthday" 
        is-link
        @click="isEditBirthdayShow=true"
      ></van-cell>

      <!--修改昵称的弹出层-->
      <van-popup 
        v-model="isEditNameShow"
        position="bottom"
        :style="{height:'100%'}"
      >
        <update-name 
          @close="isEditNameShow=false" 
          v-model="user.name"
          v-if="isEditNameShow"
        ></update-name>
      </van-popup>

      <!--修改性别的弹出层-->
      <van-popup 
        v-model="isEditGenderShow"
        position="bottom"
      >
        <update-gender @close="isEditGenderShow=false" v-model="user.gender"></update-gender>
      </van-popup>

      <!--修改生日的弹出层-->
      <van-popup 
        v-model="isEditBirthdayShow"
        position="bottom"
      >
        <update-birthday 
          v-model="user.birthday" 
          @close="isEditBirthdayShow=false"
          v-if="isEditBirthdayShow"></update-birthday>
      </van-popup>

      <!--修改头像的弹出层-->
      <van-popup 
        v-model="isEditPhotoShow"
        position="bottom"
        style="height:100%"
        class="update-photo-popup"
      >
        <update-photo 
          :file="previewImage" 
          @close="isEditPhotoShow=false"
          @update-photo="user.photo=$event"
        ></update-photo>
      </van-popup>
  </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
    name:'UserProfile',
    props:{},
    components:{
        UpdateName,
        UpdateGender,
        UpdateBirthday,
        UpdatePhoto
    },
    data(){
        return{
            user:{},//用户数据
            isEditNameShow:false,//修改昵称的弹出层显隐的控制状态
            isEditGenderShow:false,//修改性别的弹出层显隐的控制状态
            isEditBirthdayShow:false,//修改生日的弹出层显隐的控制状态
            isEditPhotoShow:false,//修改头像的弹出层显隐的控制状态
            previewImage:null//上传预览图片
        }
    },
    created(){
        this.loadUserProfile()
    },
    mounted(){},
    computed:{},
    watch:{},
    methods:{
        async loadUserProfile(){
            const {data}=await getUserProfile()
            console.log(data)
            this.user=data.data
        },
        onFileChange(){
            //展示弹出层
            this.isEditPhotoShow=true
            //获取图片路径
            const file=this.$refs.file.files[0]
            this.previewImage=file
            //清空file的值,为了解决相同文件不触发change事件
            this.$refs.file.value=''
            
            //在弹出层里面预览图片
        }
    }
}
</script>

<style scoped lang="less">
.van-popup{
  background-color: #f5f7f9;
}
.update-photo-popup{
  background-color: black;
}
</style>