//postcss的配置文件
module.exports={
    plugins:{
        //自动添加浏览器厂商声明前缀，用来兼容不同的浏览器
        //autoprefixer:{
        //   browsers:['Android>=4.0','iOS>=8'],
        //},
        //把px转化为rem
        'postcss-pxtorem':{
            rootValue:37.5,
            propList:['*'],
        }
    }
}