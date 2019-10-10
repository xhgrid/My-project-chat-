<template>
    <header>
        <span class="left" @click="$emit('goBack')">
            <i class="iconfont icon-fanhui"></i>
            <span>{{headLeftTitle}}</span>
        </span>
        <p>{{headContentTitle}} ( {{headCount}} 人)</p>
        <div class="right" @click="$emit('goOnlineuser')">
            <i>...</i>
        </div>
    </header>
</template>

<script>
export default {
    name:'',
    props:{
        headLeftTitle:String,
        headContentTitle:String,
        headCount:String
    }
}
</script>

<style scoped lang="less">
    header{
        width: 100%;
        height: 40px;
        background-color: #ededed;
        line-height: 40px;
        color: #151515;
        position: fixed;
        z-index: 800;
        display: flex;
        border-bottom: 1px solid #e0e0e0;
        .left{
            padding-left: 3%;
            i{
                font-weight: 700;
            }
            span{
                font-size: 16px;
            }
        }
        p{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            white-space: nowrap;
            font-size: 15px;
            font-weight: 600;
        }
        .right{
            width: 50px;
            height: 40px;
            text-align: center;
            position: absolute;
            right: 0;
            padding-right: 2px;
            i{
                display: inline-block;
                position: absolute;
                top: -8px;
                font-size: 26px;
            }
        }
    }
</style>
