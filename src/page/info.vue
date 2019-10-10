<template>
    <div id="common" class="info">
        <div class="article">
            <div class="content" v-html="news.mobile_content"></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'info',
    data(){
        return{
            news: {}
        }
    },
    methods: {
        newsInfo(){
            let params = {
                news_id: this.$route.query.id
            }
            this.$fetch(window.Glod.api+'article/'+params.news_id, {
                id: this.$route.query.id
            }).then((res) => {
                this.news = res.data
            })
        }
    },
    mounted() {
        this.newsInfo()
        this.$store.state.pageInfo.nav = this.$route.query.title
        this.$store.state.navShow = false
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
    },
}
</script>

<style scoped lang="less">
    #common{
        top: 0 !important;
    }
    .info{
        padding-top: 50px;
        background-color: #fff !important;
        min-height: 100%;
        .article{
            padding: 18px 16px 36px 16px;
            .content{
                line-height: 28px;
                font-size: 16px;
                background-color: #fff;
            }
        }
    }
</style>
