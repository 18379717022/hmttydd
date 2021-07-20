import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:getItem('user'), //当前登录用户的登录状态(token等数据)
    num:9
  },
  mutations: {
    //修改state中的数据需要通过mutations里面的函数来修改
    setUser(state,data){
      state.user=data
      //为了防止页面刷新数据丢失,我们还需要把数据放到本地存储中,这里仅仅是为了持久化数据
      //window.localStorage.setItem('user',JSON.stringify(state.user))
      setItem('user',state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
