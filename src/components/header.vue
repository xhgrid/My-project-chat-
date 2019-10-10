<template>
    <header class="top">
        <i @click="goBack" v-if="showBack" class="iconfont icon-fanhui left"></i>
        <span>{{nav}}</span>
        <span class="right">
            <a :href="kefuUrl" class="kefu" title="在线客服" v-if="showKefu">{{service}}</a>
        </span>
    </header>
</template>

<script>
export default {
    props:{
        nav: String,
        service: String,
        showKefu: Boolean,
        showBack: Boolean,
        kefuUrl: String
    },
    methods: {
        goBack(){
            this.$emit('returnUpper')
        }
    },
}
</script>

<style scoped lang="less">
    .top{
        position: fixed;
        top: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #e53333;
        color: #fff;
        text-align: center;
        z-index: 100;
        span{
            display: inline-block;
            font-size: 20px;
            width: 60%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .left{
            position: absolute;
            left: 0px;
            font-size: 24px;
            padding: 0 15px;
        }
        .right{
            position: absolute;
            right: 10px;
            font-size: 15px;
            padding: 0 15px;
            a{
                color: #fff;
            }
        }
    }
</style>
