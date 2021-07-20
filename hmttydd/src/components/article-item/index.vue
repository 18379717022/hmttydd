<template>
    <van-cell 
    class="article-item"
    @click="ToArticleDetail(article.art_id)">
        <div slot="title" class="title van-multi-ellipsis--13">{{article.title}}</div>
        <div slot="label">
            <div class="cover-wrap" v-if="article.cover.type===3">
                <div class="cover-wrap-item"
                v-for="(img,index) in article.cover.images"
                :key="index">
                    <van-image 
                    fit="cover"
                    :src="img"
                    class="cover-item">

                    </van-image>
                </div>
            </div>
            <div class="label-wrap">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}评论</span>
                <span>{{article.pubdate | relativeTime}}</span>
            </div>
        </div>
        <van-image v-if="article.cover.type===1"
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"></van-image>
    </van-cell>
</template>

<script>

export default {
    name:'ArticleItem',
    components:{},
    props:{
        article:{
            type:Object
        }
    },
    data(){
        return{}
    },
    computed:{},
    methods:{
        ToArticleDetail(id){
            this.$router.push('/article/'+id)
        }
    },
    created:{},
    mounted:{}
}
</script>

<style scoped lang="less">
.article-item{
    .title{
        font-size: 16px;
        color: #3a3a3a;
    }
    .right-cover{
        width: 116px;
        height: 73px;
    }
    /deep/.van-cell__value{
        flex:unset;
        width: 116px;
        height: 73px;
        margin-left: 13px;
    }
    .cover-wrap{
        display: flex;
        .cover-wrap-item{
            flex: 1;
            &:not(:last-child){
                padding-right: 4px;
            }
            .cover-item{
                width: 100%;
                height: 73px;
            }
        }
    }
    .label-wrap{
        font-size: 11px;
        color: #b4b4b4;
    }
    .label-wrap span{
        margin-right: 12px;
    }
}
</style>