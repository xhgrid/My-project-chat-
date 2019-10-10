<template>
    <div :class="className">
        <div class="timeLine" v-if="chatTime">
            <span class="time">{{time}}</span>
        </div>
        <div class="avatarBox">
            <img :src="avatar" alt="">
        </div>
        <div class="text">
            <p>
                <span v-if="uid == -1" class="grade">房管</span>
                <span class="name">{{user}}</span>
            </p>
            <!-- 文字消息 -->
            <span v-if="type == 'text'" class="content" v-html="content"></span>
            <!-- 投注标识 -->
            <span v-if="type == 2" class="flagType">
                <b class="shareIcon betShare"></b>注单分享
            </span>
            <!-- 红包标识 -->
            <span v-if="type == 'red_bag'" class="flagType">
                <b class="shareIcon redShare"></b>
                <i v-if="redbagType == 'mine'">扫雷红包</i>
                <i v-if="redbagType == 'welfare'">普通红包</i>
                <i v-if="redbagType == 'series'">接龙红包</i>
            </span>
            <!-- 盈亏标识 -->
            <span v-if="type == 5" class="flagType">
                <b class="shareIcon betRecord"></b>今日战绩
            </span>
        </div>
        <!-- 投注消息 -->
        <div class="order" v-if="type == 2">
            <div class="lotteryInfo">
                <div class="floatL">
                    <div class="lotteryIcon">
                        <img src="../../../static/myavatar.jpg" alt="">
                    </div>
                    <div>
                        <p>{{content.lotteryName}}</p>
                        <span class="issue">{{content.issueNo.substring(4,13)}}期</span>
                    </div>
                </div>
                <div class="floatR">
                    <i class="followBet">跟投</i>
                </div>
            </div>
            <div class="betInfo">
                <p>
                    <span class="payName">{{content.items.playName}}</span>
                    <span v-if="content.items.betBig?true:false" class="big">{{content.items.betBig}}</span>
                    <span v-if="content.items.betBig?true:false" class="small">{{content.items.betSmall}}</span>
                    <span class="number">{{content.items.betNumber}}</span>
                    <span class="betMoney">{{content.items.betMoney}}</span>
                </p>
            </div>
        </div>
        <!-- 图片消息 -->
        <div class="showImgLine" v-if="type == 'image'">
            <img :src="content" alt="" @click.stop="bigImg($event)">
        </div>
        <!-- 红包消息 -->
        <div class="money" @click.stop="$emit('openRedbag')" v-if="type == 'red_bag'">
            <p>{{content.description}}</p>
            <br>
            <p>查看红包</p>
        </div>
        <!-- 盈亏消息 -->
        <div class="profitloss" v-if="type == 5">
            <dl>
                <dt>20.00</dt>
            </dl>
            <dl>
                <dt>19.60</dt>
            </dl>
            <dl>
                <dt>-0.40</dt>
            </dl>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    props:{
        uid:Number,
        className:[Object,String,Array],
        type:String,
        time:String,
        user:String,
        avatar:String,
        content:[Object,String],
        chatTime:Boolean,
        redbagType:String
    },
    methods: {
        bigImg(e){
            this.$emit('bigImg',e)
        }
    }
}
</script>

<style scoped lang="less">
    // 他人消息
    .otherMsg{
        padding: 4px 50px 0;
        color: #434343;
        position: relative;
        min-height: 50px;
        clear: both;
        overflow: hidden;
        .avatarBox{
            width: 40px;
            height: 40px;
            // background: #c6c6c6;
            position: absolute;
            left: 0;
            border-radius: 50%;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        .text{
            word-break: break-word;
            margin-left: 4px;
            margin-bottom: 6px;
            position: relative;
            p{
                .name{
                    color: #7a7a7a;
                    vertical-align: top;
                    font-size: 14px;
                }
                .grade{
                    display: inline-block;
                    width: 36px;
                    font-size: 12px;
                    text-align: center;
                    background: linear-gradient(270deg,#fb8754,#fb4b46);
                    color: #fff;
                    border-radius: 4px;
                    height: 20px;
                    line-height: 20px;
                    margin-right: 3.6px;
                }
            }
            .content{
                vertical-align: top;
                background: #fff;
                float: left;
                padding: 6px 9px;
                margin-top: 7px;
                font-size: 14px;
                border-radius: 6px;
                position: relative;
            }
            .content:before{
                content: "";
                display: block;
                position: absolute;
                left: -10px;
                top: 9px;
                width: 0;
                height: 0;
                border-top: 12px solid #fff;
                border-left: 12px solid transparent;
                -webkit-transform: skewY(10deg);
                transform: skewY(10deg);
            }
            .flagType{
                vertical-align: top;
                background: #ddd;
                padding: 2.4px 7px 3px;
                border-radius: 12px;
                color: #fff;
                font-size: 12px;
                position: absolute;
                right: 0;
                bottom: 0;
                .shareIcon{
                    width: 12px;
                    height: 12px;
                    display: inline-block;
                    margin-right: 5px;
                    vertical-align: initial;
                    position: relative;
                    top: 1.2px;
                }
            }
        }
        // 跟投
        .order:before{
            content: "";
            display: block;
            position: absolute;
            left: -10px;
            top: 9px;
            width: 0;
            height: 0;
            border-top: 12px solid #fff;
            border-left: 12px solid transparent;
            -webkit-transform: skewY(10deg);
            transform: skewY(10deg);
        }
        // 红包
        .money:before{
            content: "\e614";
            font-family: iconfont;
            font-size: 44px;
            position: absolute;
            top: 20px;
            left: 7px;
            color: #e6494e;
        }
        .money:after{
            content: "";
            display: block;
            position: absolute;
            left: -9px;
            top: 13px;
            width: 0;
            height: 0;
            border-top: 12px solid #f2812f;
            border-left: 12px solid transparent;
            -webkit-transform: skewY(10deg);
            transform: skewY(10deg);
        }
        // 盈亏
        .profitloss:after{
            content: "";
            display: block;
            position: absolute;
            left: -9px;
            top: 13px;
            width: 0;
            height: 0;
            border-top: 12px solid #fff;
            border-left: 12px solid transparent;
            -webkit-transform: skewY(10deg);
            transform: skewY(10deg);
        }
    }
    //我的消息
    .myMsg{
        // margin: 14px 0;
        padding: 4px 50px 0;
        color: #434343;
        position: relative;
        min-height: 54px;
        clear: both;
        overflow: hidden;
        .avatarBox{
            right: 0;
            left: auto;
            width: 40px;
            height: 40px;
            // background: #c6c6c6;
            position: absolute;
            border-radius: 50%;
            img{
                width: 100%;
                border-radius: 50%;
            }
        }
        .text{
            word-break: break-word;
            margin-left: 4px;
            margin-bottom: 6px;
            position: relative;
            p{
                text-align: right;
                .name{
                    color: #7a7a7a;
                    vertical-align: top;
                    font-size: 14px;
                }
            }
            .content{
                background: #95ec69;
                float: right;
                vertical-align: top;
                padding: 6px 9px;
                margin-top: 7px;
                font-size: 14px;
                border-radius: 5px;
                position: relative;
                float: right;
            }
            .content:before{
                content: "";
                display: block;
                position: absolute;
                right: -10px;
                top: 9px;
                width: 0;
                height: 0;
                border-top: 12px solid #95ec69;
                border-right: 12px solid transparent;
                -webkit-transform: skewY(10deg);
                transform: skewY(10deg);
            }
            .flagType{
                vertical-align: top;
                background: #ddd;
                padding: 2.4px 7px 3px;
                border-radius: 12px;
                color: #fff;
                font-size: 12px;
                position: absolute;
                left: 0;
                bottom: 0;
                .shareIcon{
                    width: 12px;
                    height: 12px;
                    display: inline-block;
                    margin-right: 5px;
                    vertical-align: initial;
                    position: relative;
                    top: 1.2px;
                }
            }
        }
        // 跟投
        .order:before{
            content: "";
            display: block;
            position: absolute;
            right: -9px;
            top: 12px;
            width: 0;
            height: 0;
            border-top: 12px solid #fff;
            border-right: 12px solid transparent;
            -webkit-transform: skewY(10deg);
            transform: skewY(10deg);
        }
        // 图片
        .showImgLine{
            text-align: right;
        }
        // 红包
        .money:before{
            content: "\e614";
            font-family: iconfont;
            font-size: 44px;
            position: absolute;
            top: 20px;
            left: 7px;
            color: #e6494e;
        }
        .money:after{
            content: "";
            display: block;
            position: absolute;
            right: -9px;
            top: 13px;
            width: 0;
            height: 0;
            border-top: 12px solid #f2812f;
            border-right: 12px solid transparent;
            -webkit-transform: skewY(10deg);
            transform: skewY(10deg);
        }
        // 盈亏
        .profitloss:after{
            content: "";
            display: block;
            position: absolute;
            right: -9px;
            top: 12px;
            width: 0;
            height: 0;
            border-top: 12px solid #fff;
            border-right: 12px solid transparent;
            -webkit-transform: skewY(10deg);
            transform: skewY(10deg);
        }
    }
</style>
