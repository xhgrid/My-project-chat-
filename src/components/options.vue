<template>
    <div class="options">
        <div v-for="(item, index) in listData" :key="index">
            <router-link :to="item.path">
                <i :class="item.icon" v-show="iconShow"></i>
                <span>{{item.title}}</span>
                <i :class="right"></i>
            </router-link>
            <p></p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        listData:Array,
        iconShow:Boolean,
        right:{
            type:String,
            default:'iconfont icon-qianjin'
        }
    }
}
</script>

<style>
    .iconColor1{
        background: #7885ca;
    }
    .iconColor2{
        background: #81c784;
    }
    .iconColor3{
        background: #63b4f6;
    }
    .iconColor4{
        background: rgb(251, 75, 104);
    }
    .iconColor5{
        background: #7885ca;
    }
    .iconColor6{
        background: rgb(99, 180, 246);
    }
</style>
<style scoped lang="less">
    .options{
        background: #fff;
        // margin-top: 92px;
        div{
            a{
                width: 100%;
                display: block;
                line-height: 36px;
                padding: 9px 19px;
                color: #333;
                i:nth-of-type(1){
                    height: 22px;
                    width: 22px;
                    border-radius: 3px;
                    line-height: 23px;
                    text-align: center;
                    font-size: 16px;
                    display: inline-block;
                    // vertical-align: middle;
                    margin-right: 7px;
                    color: #fff;
                }
                i:nth-of-type(2){
                    float: right;
                    display: inline-block;
                    margin-top: 10px;
                    color: #ccc;
                    line-height: 20px;
                    font-size: 18px;
                }
                span{
                    font-size: 14px;
                    color: #333;
                }
            }
            p{
                float: right;
                width: 356px;
                height: 1px;
                transform: scaleY(.5);
                background: #f1f1f1;
            }
        }
    }
</style>