<template>
    <div class="spreadList">
        <div class="spreadTitle">
            <p class="left">
                <i></i>
                <span>{{spreadTitle}}</span>
            </p>
            <p class="right">
                <router-link :to="{path:'/lotteryhall', query:{id:(spreadTitle == '彩票'?0:1)}}">
                    <span>全部</span>
                    <i class="iconfont icon-qianjin"></i>
                </router-link>
            </p>
        </div>
        <ul class="spreadContent">
            <li v-for="(item, index) in spread" :key="index">
                <router-link :to="{path:('/room'+item.type), query:{link:item.link}}">
                    <img :src="item.avatar" alt="">
                    <div>
                        <span>{{item.name}}</span>
                        <p>{{item.description}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        spread:Array,
        spreadTitle:String
    },
    methods: {
        goLotteryhall(){
            this.$router.push('/lotteryhall')
        }
    },
}
</script>

<style scoped lang="less">
    .spreadList{
        background-color: #fff;
        margin-bottom: 8px;
        .spreadTitle{
            height: 36px;
            line-height: 38px;
            padding: 0 16px;
            border-bottom: 1px solid #f2f2f2;
            clear: both;
            zoom: 1;
            .left{
                float: left;
                position: relative;
                display: block;
                i{
                   width: 3px;
                   height: 18px;
                   display: block;
                   background-color: #e53333;
                   position: absolute;
                   top: 9px;
                }
                span{
                    padding-left: 14px;
                    font-size: 15px;
                    color: #000;
                }
            }
            .right{
                float: right;
                a{
                    width: 100%;
                    height: 100%;
                    display: block;
                    color: #e53333;
                    i{
                        font-size: 14px;
                    }
                    span{
                        font-size: 13px;
                    }
                }
            }
        }
        .spreadContent{
            clear: both;
            overflow: hidden;
            zoom: 1;
            padding: 15px 0;
            li{
                float: left;
                width: 33.3333%;
                position: relative;
                overflow: hidden;
                margin-bottom: 23px;
                a{
                    display: block;
                    width: 100%;
                    text-align: center;
                    img{
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                        margin-bottom: 8px;
                    }
                    div{
                        span{
                            font-size: 15px;
                            color: #333;
                            padding-bottom: 4px;
                            display: block;
                        }
                        p{
                            color: #999;
                            font-size: 12px;
                        }
                    }
                }
                
            }
        }
    }
</style>
