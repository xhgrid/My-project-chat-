<template>
    <div class="top">
        <i @click="$emit('returnUpper')" class="iconfont icon-fanhui"></i>
        <span>{{nav}}</span>
    </div>
</template>

<script>
export default {
    props:{
        nav: String
    }
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
        z-index: 900;
        span{
            font-size: 17px;
        }
        .iconfont{
            position: absolute;
            top: 0;
            left: 0;
            font-size: 26px;
            padding: 0 10px;
        }
    }
</style>
