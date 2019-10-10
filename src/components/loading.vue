<template>
    <div class="loading">
        <div class="box">
            <van-loading color="#fff" size="50px"></van-loading>
        </div>
    </div>
</template>

<script>
import { Loading } from 'vant'
export default {
    components:{
        [Loading.name]:Loading
    }
}
</script>

<style scoped lang="less">
    .loading{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #333;
        opacity: 0.8;
        z-index: 9999;
        .box{
            width: 50px;
            height: 50px;
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%);
            .van-loading{
                margin: 0 auto;
            }
        }
    }
</style>
