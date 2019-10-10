<template>
    <div id="common" class="login">
        <table class="publicTab">
            <tbody>
                <tr>
                    <td>账号</td>
                    <td class="inputBox">
                        <input type="text" v-model.trim="loginData.account" @change="deleteEmpty(loginData.account)" @input="userMonitor" autocomplete="off" placeholder="请输入账号" maxlength="" >
                        <i @click="deleteUsername" v-show="inputDelete.userName" class="iconfont icon-close"></i>
                    </td>
                </tr>
                <tr>
                    <td>密码</td>
                    <td class="inputBox">
                        <input type="password" v-model.trim="loginData.password" @input="paswMonitor" autocomplete="off" placeholder="请输入密码" maxlength="" >
                        <i @click="deletePassword" v-show="inputDelete.passWord" class="iconfont icon-close"></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="forget">
            <span @click="forgetPassword">忘记密码</span>
        </div>
        <div class="loginBtn btn" @click="signIn">
            <span :class="{'noClick':this.$store.state.pageInfo.noClick}">立即登录</span>
        </div>
        <div class="regBtn btn">
            <span @click="goReg">
                免费注册
            </span>
        </div>
    </div>
</template>

<script>
import { Dialog,Toast } from 'vant'
export default {
    name:'login',
    data() {
        return {
            loginData:{
                account:'',
                password:''
            },
            inputDelete:{
                userName:false,
                passWord:false
            }
        }
    },
    components:{
        [Dialog.name]:Dialog,
        [Toast.name]:Toast
    },
    methods: {
        deleteEmpty(item){
            // this.loginData.account.replace(/\s/g,"")
            item.replace(/\s/g,"")
            // console.log(item.length)
        },
        // 跳转到登录页
        goReg(){
            this.$router.push('/register')
            if(window.Glod.registerUrl == ''){
                this.$router.push('/register')
            }else{
                window.location.href = window.Glod.registerUrl
            }
        },
        // 跳转到首页
        goHome(){
            this.$router.push('home')
        },
        // 监听账号输入框
        userMonitor(){
            if(this.loginData.account.length > 0){
                this.inputDelete.userName = true
            }else{
                this.inputDelete.userName = false
            }
        },
        // 监听密码输入框
        paswMonitor(){
            if(this.loginData.password.length > 0){
                this.inputDelete.passWord = true
            }else{
                this.inputDelete.passWord = false
            }
        },
        // 删除账号内容
        deleteUsername(){
            this.loginData.account = ''
            this.inputDelete.userName = false
        },
        // 删除密码内容
        deletePassword(){
            this.loginData.password = ''
            this.inputDelete.passWord = false
        },
        //忘记密码
        forgetPassword(){
            Dialog.alert({
                message: '请联系在线客服'
            }).then(() => {
            // on close
            });
        },
        // 立即登录
        signIn(){
            if(!this.loginData.account){
                Toast('账号不能为空')
                return
            }
            else if(this.loginData.account.length !== 11){
                Toast('请输入手机号码')
                return
            }
            if(!this.loginData.password){
                Toast('密码不能为空')
                return
            }else if(this.loginData.password.length < 6){
                Toast('密码不能低于6位')
                return
            }
            Toast.loading({
                mask: true,
                message: '登录中'
            })
            this.$post(window.Glod.api+'token', this.loginData).then((res) =>{
                if(res.access_token){
                    let Token = res.token_type +' '+ res.access_token
                    localStorage.setItem('Authorization',Token)
                    localStorage.setItem('userInfo',JSON.stringify(res))
                    // console.log(res)
                    let redirect = decodeURIComponent(this.$route.query.redirect || '/');  //获取登录成功后要跳转的路由。
                    this.$router.push({
                        path: redirect
                    })
                    let sendData = {
                        token: Token,
                        message_type: 'login'
                    }
                    this.socketApi.sendSock(sendData)
                    this.socketApi.initWebSocket()
                    Toast('登陆成功')
                } 
                }).catch(function(error) {
            })
        },
    },
    mounted() {
        this.$store.state.navShow = false
        this.$store.state.pageInfo.nav = window.Glod.login
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
    },
}
</script>
<style scoped lang="less">
</style>
