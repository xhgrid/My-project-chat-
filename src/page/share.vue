<template>
    <div id="common" class="share">
        <div class="shareList">
            <div class="tp">
                <p>邀请码&nbsp;：<span class="copy">{{inviteCode}}</span></p>
            </div>
            <div class="bot">
                <div v-clipboard:copy="inviteCode" 
                     v-clipboard:success="copyShaneCode" 
                     v-clipboard:error="oninviteCodeError"
                >
                复制邀请码
                </div>
                <div v-clipboard:copy="'http://'+host+inviteCodeStr+'register?invitecode='+inviteCode" 
                     v-clipboard:success="copyShaneUrl" 
                     v-clipboard:error="oncopyShaneUrlError"
                >
                复制注册链接
                </div>
            </div>
        </div>
        <p class="shareTip">{{shareTip}}</p>
        <img class="shareImg" @click="bigImgShow($event)" v-if="shareImg !== '' && shareImg !== null" :src="shareImg" alt="">
        <div class="enlargeImg" @click="smallImg" v-if="showImg">
            <img :src="bigImg" alt="">
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    name:'share',
    data(){
        return{
            inviteCodeStr:window.Glod.invitecode,
            inviteCode:111222,
            shareImg:'',
            bigImg:'',
            shareTip:window.Glod.shareTip,
            host:window.location.host,
            showImg:false
        }
    },
    components:{
        [Toast.name]:name
    },
    methods: {
        // 图片还原
        smallImg(){
            this.showImg = false
        },
        // 图片放大
        bigImgShow(e){
            this.showImg = true
            let src = e.toElement.currentSrc
            this.bigImg = src
        },
        copyShaneCode(){
            Toast.loading({
                mask: true,
                message: '复制成功',
                duration: 500
            });
        },
        oninviteCodeError(){
            Toast.loading({
                mask: true,
                message: '复制失败',
                duration: 500
            });
        },
        copyShaneUrl(){
            Toast.loading({
                mask: true,
                message: '复制成功',
                duration: 500
            });
        },
        oncopyShaneUrlError(){
            Toast.loading({
                mask: true,
                message: '复制失败',
                duration: 500
            });
        }
    },
    mounted() {
        this.$store.state.navShow = false
        this.$store.state.pageInfo.nav = window.Glod.share
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
        let inviteCode = JSON.parse(localStorage.getItem('userInfo'))
        this.inviteCode = inviteCode.invitation
        this.shareImg = inviteCode.share_img
        // console.log(inviteCode.share_img)
    },
}
</script>

<style scoped lang="less">
    .share{
        max-height: 100%;
        overflow: hidden;
        .shareList{
            height: 114px;
            color: #777;
            background: #fff;
            margin-top: 14px;
            font-size: 14px;
            .tp{
                border-bottom: 1px solid #eee;
                height: 70px;
                padding: 13px  20px 0;
                line-height: 44px;
                P{
                    font-size: 20px;
                }
            }
            .bot{
                padding: 8px 0;
                div{
                    border-right: 1px solid #eee;
                    text-align: center;
                    float: left;
                    width: 50%;
                    line-height: 32px;
                }
                div:nth-of-type(2){
                    border: none;
                }
                div:hover{
                    color: red;
                }
            }
        }
        .shareTip{
            padding-top: 10px;
            font-size: 16px;
            color: #888;
            margin: 8px 8px;
            text-align: left;
        }
        .shareImg{
            width: 200px;
            -webkit-touch-callout:default;
            display: block;
            margin: 0 auto;
        }
        // 图片放大
        .enlargeImg{
            width: 100%;
            height: 100%;
            background-color: #000;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 801;
            overflow-x: auto;
            img{
                width: 100%;
                max-height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%,-50%,0);
                -webkit-touch-callout:default;
            }
        }
    }
</style>
