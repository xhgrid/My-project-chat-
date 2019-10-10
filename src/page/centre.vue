<template>
    <div id="common" class="main">
        <div class="topInfo"></div>
        <div class="topCard">
            <div class="cardTop" @click="goPersonal">
                <router-link to="/personal">
                    <img :src="userData.avatar" alt="">
                </router-link>
                <div class="userInfo">
                    <ins class="userName">{{userData.nickname}}</ins>
                    <!-- <span class="vip">{{userData.vip}}</span> -->
                    <p>
                        <span v-if="!moneyShow" @click.stop="moneyOpen">
                            <i class="eye">余额</i>
                            <i></i>
                        </span>
                        <span class="showMoney" v-if="moneyShow" @click.stop="moneyHide">
                            ￥{{parseFloat(userData.coin).toFixed(2)}}
                        </span>
                    </p>
                </div>
                <i class="right iconfont icon-qianjin"></i>
            </div>
            <div class="cardBottom">
                <div v-for="(item, index) in centreNav" :key="index">
                   <router-link :to="item.path">
                        <i :class="'iconfont '+item.icon"></i>
                        <span>{{item.title}}</span>
                    </router-link> 
                </div>
                <div class="kefu" @click="showPopup">
                    <a>
                        <i class='iconfont icon-fenxiangcopy'></i>
                        <span>分享</span>
                    </a>
                </div>
                <div>
                    <a :href="kefuUrl">
                        <i class='iconfont icon-kefu'></i>
                        <span>客服</span>
                    </a>
                </div>
            </div>
        </div>
        <options :listData="listData" :iconShow="true"></options>
        <options class="setting" :listData="listtwoData" :iconShow="true"></options>
        <div style="height: 100px;"></div>
        <van-popup type="primary" v-model="shareWechat" :round="true" position="bottom" :style="{ backgroundColor:'#f9f9f9' }">
            <div class="shareOutside">
                <div @click="wechatShare">
                    <img src="../../static/wechatLogo.png" alt="">
                    <p>微信分享</p> 
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import options from '../components/options'
import { Popup } from 'vant'
export default {
    name:'centre',
    data(){
        return{
            invitation:'',
            shareWechat:false,
            moneyShow:false,
            userData:{},
            centreNav: window.Glod.centerNav,
            listData: window.Glod.centerlistData,
            listtwoData: window.Glod.centerlisttwoData,
            kefuUrl: window.Glod.kefuUrl
        }
    },
    components:{
        options,
        [Popup.name]:Popup,
    },
    methods: {
        wechatShare(){
            window.location.href = window.Glod.wechatShareUrl + '/share.html'+'?code='+this.userData.invitation
        },
        showPopup(){
            this.shareWechat = !this.shareWechat
        },
        // 显示余额
        moneyOpen(){
            this.moneyShow = true
            this.$fetchs(window.Glod.api+'get_user_coin').then((res)=>{
                if(res.status == 1){
                    this.userData.coin = res.coin
                }
            })
        },
        //隐藏余额
        moneyHide(){
            this.moneyShow = false
        },
        // 跳转到个人资料页
        goPersonal(){
            this.$router.push('/personal')
        }
    },
    mounted() {
        this.$store.state.pageInfo.nav = window.Glod.centre
        this.$store.state.navShow = true
        this.$store.state.pageInfo.showBack = false
        this.$store.state.pageInfo.showKefu = false
        this.userData = JSON.parse(localStorage.getItem('userInfo'))
        // if(localStorage.getItem('userInfo')){
        //     let share = JSON.parse(localStorage.getItem('userInfo'))
        //     this.invitation = share.invitation
        // }else{
        //     this.invitation = window.Glod.defaultInvitation
        // }
    },
}
</script>

<style scoped>
.setting{
    margin-top: 11px !important;
}
.options{
    margin-top: 92px;
}
</style>

<style scoped lang="less">
    .main{
        // -webkit-overflow-scrolling: touch;
        // overflow: scroll;
        .topInfo{
            background: linear-gradient(#e53333,#ec5639);
            border-bottom-left-radius: 18px;
            border-bottom-right-radius: 18px;
            height: 82px;
        }
        .topCard{
            background: #fff;
            height: 164px;
            border-radius: 6px;
            position: absolute;
            width: 95%;
            left: 2.5%;
            top: 0;
            .cardTop{
                height: 50%;
                padding: 11px 32px;
                position: relative;
                a{
                    background: transparent;
                    text-decoration: none;
                    color: inherit;
                    img{
                        border-radius: 50%;
                        height: 62px;
                        width: 62px;
                        float: left;
                        margin-right: 12px;
                    }
                }
                .userInfo{
                    font-size: 14px;
                    padding-top: 6px;
                    float: left;
                    .userName{
                        margin-top: 2px;
                        color: #666;
                    }
                    .vip{
                        margin-left: 6px;
                        color: #fff;
                        vertical-align: 5%;
                        display: inline-block;
                        border-radius: 3px;
                        width: 36px;
                        text-align: center;
                        padding: 1px 0 0;
                        line-height: 20px;
                        font-size: 12px;
                        background: -webkit-linear-gradient(left,#dc8c2e,#ffcc8e)!important;
                    }
                    p{
                        margin-top: 10px;
                        span{
                            display: inline-block;
                            padding-right: 54px;
                            .eye{
                                color: #888;
                                position: relative;
                            }
                            .eye:after{
                                content: "\e61d";
                                font-family: iconfont;
                                right: -1.1em;
                                position: absolute;
                                top: -2;
                                font-size: 16px;
                            }
                        }
                        .showMoney{
                            color: #e54142;
                        }
                    }
                }
                .right{
                    text-align: right;
                    color: #ccc;
                    font-size: 18px;
                    float: right;
                    margin-top: 24px;
                }
            }
            .cardTop:after{
                content: "";
                width: 90%;
                height: 1px;
                background: #f2f2f2;
                transform: scaleY(-.5);
                display: block;
                position: absolute;
                left: 5%;
                bottom: 0;
            }
            .cardBottom{
                padding: 0 22px;
                vertical-align: middle;
                text-align: center;
                background: #fff;
                div{
                    a{
                        display: block;
                        float: left;
                        width: 25%;
                        margin-top: 15px;
                        // height: 50px;
                        // line-height: 50px;
                        i{
                            width: 30px;
                            height: 30px;
                            line-height: 32px;
                            vertical-align: middle;
                            background: #f08565;
                            margin: 0 auto;
                            border-radius: 50%;
                            display: block;
                            font-weight: 400;
                            color: #fff;
                            font-size: 18px;
                        }
                        // i:after{
                        //     content: "\e6d7";
                        //     font-family: iconfont;
                        //     font-size: 20px;
                        //     color: #fff;
                        // }
                        span{
                            line-height: 28px;
                            font-size: 14px;
                            color: #333;
                            display: block;
                        }
                    }
                }
                div:nth-of-type(2){
                    i{
                        background: #f66;
                    }
                    // i:after{
                    //     content: "\e6d7";
                    //     font-family: iconfont;
                    //     font-size: 20px;
                    //     color: #fff;
                    // }
                }
                div:nth-of-type(3){
                    i{
                        background: #ff972a;
                        font-size: 15px;
                    }
                    // i:after{
                    //     content: "\e6d7";
                    //     font-family: iconfont;
                    //     font-size: 20px;
                    //     color: #fff;
                    // }
                }
                div:nth-of-type(4){
                    i{
                        background: #6cc;
                        font-size: 20px;
                    }
                    // i:after{
                    //     content: "\e6d7";
                    //     font-family: iconfont;
                    //     font-size: 20px;
                    //     color: #fff;
                    // }
                }
            }
        }
        .shareOutside{
            display: flex;
            padding: 20px;
            div{
                width: 25%;
                text-align: center;
                img{
                    width: 40px;
                    height: 40px;
                    margin-bottom: 5px;
                }
            }
        }
    }
</style>
