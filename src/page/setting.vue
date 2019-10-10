<template>
    <div id="common" class="setting">
        <options :listData="listData" :iconShow="false"></options>
        <div class="btn" @click="loginOut">
            <span>{{btnName}}</span>
        </div>
    </div>
</template>

<script>
import options from '../components/options'
import { Toast } from 'vant'
export default {
    name:'setting',
    data(){
        return{
            listData:[
                {
                    path:'/bankcard',
                    icon:'iconfont icon-wj-zcjl iconColor2',
                    title:'绑定银行卡'
                },
                {
                    path:'/reviselogin',
                    icon:'iconfont icon-jiaoyijilu iconColor1',
                    title:'登录密码设置'
                },
                {
                    path:'/revisewithdraw',
                    icon:'iconfont icon-wj-zcjl iconColor2',
                    title:'提现密码设置'
                }
            ],
            btnName:window.Glod.logoutBtn
        }
    },
    components:{
        options,
        [Toast.name]:Toast
    },
    methods: {
        loginOut(){
            localStorage.removeItem('Authorization')
            localStorage.removeItem('userInfo')
            this.socketApi.initWebSocket()
            Toast('退出成功')
            this.$router.push('/')
        }
    },
    mounted() {
        this.$store.state.navShow = false
        this.$store.state.pageInfo.nav = window.Glod.setting
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
    },
}
</script>

<style scoped>
.options{
    margin-top: 11px;
}
.options >>> div a span{
    font-size: 15px !important;
}
.btn{
    margin-top:22px;
}
</style>

<style scoped lang="less">
</style>
