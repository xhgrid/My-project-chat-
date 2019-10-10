<template>
    <div id="common" class="about">
        <div class="options">
            <div v-if="aboutData.official_url !== ''">
                <p
                    v-clipboard:copy="aboutData.official_url" 
                    v-clipboard:success="copyOfficial" 
                    v-clipboard:error="onOfficialError"
                >
                    平台官网 : {{aboutData.official_url}}
                    <span>复制</span>
                </p>
            </div>
            <div v-if="aboutData.wechat !== ''">
                <p
                    v-clipboard:copy="aboutData.wechat" 
                    v-clipboard:success="copyWechat" 
                    v-clipboard:error="onWechatError"
                >
                    客服微信 : {{aboutData.wechat}}
                    <span>复制</span>
                </p>
            </div>
            <div v-if="aboutData.qq !== ''">
                <p
                    v-clipboard:copy="aboutData.qq" 
                    v-clipboard:success="copyqq" 
                    v-clipboard:error="onqqError"
                >
                    客服QQ: {{aboutData.qq}}
                    <span>复制</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    name:'about',
    data(){
        return{
            aboutData:{
                official_url:'',
                wechat:'',
                qq:''
            }
        }
    },
    methods: {
        copyOfficial(){
            Toast.loading({
                mask: true,
                message: '复制成功',
                duration: 500
            });
        },
        onOfficialError(){
            Toast.loading({
                mask: true,
                message: '复制失败',
                duration: 500
            });
        },
        copyqq(){
            Toast.loading({
                mask: true,
                message: '复制成功',
                duration: 500
            });
        },
        onqqError(){
            Toast.loading({
                mask: true,
                message: '复制失败',
                duration: 500
            });
        },
        copyWechat(){
            Toast.loading({
                mask: true,
                message: '复制成功',
                duration: 500
            });
        },
        onWechatError(){
            Toast.loading({
                mask: true,
                message: '复制失败',
                duration: 500
            });
        }
    },
    mounted() {
        this.$store.state.navShow = false
        this.$store.state.pageInfo.nav = window.Glod.about
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
        this.$fetch(window.Glod.api+'about').then((res)=>{
            if(res.status == 1){
                this.aboutData.official_url = res.website
                this.aboutData.wechat = res.waiter_wechat
                this.aboutData.qq = res.waiter_qq
            }
        })
    },
}
</script>

<style scoped lang="less">
    .about{
        .options{
            margin-top: 11px;
            background-color: #fff;
            div{
                width: 100%;
                display: block;
                line-height: 33px;
                padding: 9px 18px;
                color: #333;
                font-size: 15px;
                position: relative;
                span{
                    float: right;
                }
            }
            div:after{
                content: "";
                width: 90%;
                height: 1px;
                background: #f2f2f2;
                // transform: scaleY(-.5);
                display: block;
                position: absolute;
                left: 5%;
                bottom: 0;
            }
        }
    }
</style>