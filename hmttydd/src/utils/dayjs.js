//初始化 dayjs相关配置

import dayjs from 'dayjs'
import Vue from 'vue'

//加载使用中文语言包
import 'dayjs/locale/zh-cn'

//配置使用中文语言包
dayjs.locale('zh-cn')

import relativeTime from 'dayjs/plugin/relativeTime'

//配置使用处理相对时间
dayjs.extend(relativeTime)

//例如日期格式化

//把处理相对时间的代码包装为全局过滤器
//然后就可以在任何组件的模板中使用了
//所谓的过滤器其实就是一个可以在模板中调用的函数而已
//在组件模板中使用过滤器:{{xxx | relativeTime}}
//管道符前面的内容会作为参数传递给过滤器函数
//过滤器的返回值会渲染到使用过滤器的模板中

Vue.filter('relativeTime',value=>{
    return dayjs(value).from(dayjs())
})

Vue.filter('datetime',(value,format='YYYY-MM-DD HH:mm:ss')=>{
    return dayjs(value).format(format)
})