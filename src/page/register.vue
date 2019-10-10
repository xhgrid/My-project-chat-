<template>
    <div id="common" class="register">
        <table class="publicTab">
            <tbody>
                <tr>
                    <td>邀请码</td>
                    <td class="inputBox">
                        <input type="text" v-model.trim.trim="registerData.invitation" @input="inviteMonitor" autocomplete="off" placeholder="请输入邀请码" maxlength="" >
                        <i @click="deleteinvitation" v-show="inputDelete.invitation" class="iconfont icon-close"></i>
                    </td>
                </tr>
                <tr>
                    <td>手机</td>
                    <td class="inputBox">
                        <input style="width:72%;" type="number" v-model.trim.trim="registerData.mobile_number" placeholder="请输入手机号码" maxlength="" >
                        <span @click="validateBtn" :class="{'noClick':noClick}">{{btnTitle}}</span>
                    </td>
                </tr>
                <tr>
                    <td>验证码</td>
                    <td class="inputBox">
                        <input type="text" v-model.trim.trim="registerData.identifying" @input="identifyingMonitor" autocomplete="off" placeholder="请输入验证码" maxlength="" >
                        <i @click="deleteidentifying" v-show="inputDelete.identifying" class="iconfont icon-close"></i>
                    </td>
                </tr>
                <tr>
                    <td>登录密码</td>
                    <td class="inputBox">
                        <input type="password" v-model.trim.trim="registerData.password" @input="pasdMonitor" autocomplete="off" placeholder="请输入密码" maxlength="" >
                        <i @click="deletePasd" v-show="inputDelete.password" class="iconfont icon-close"></i>
                    </td>
                </tr>
                <tr>
                    <td>确认密码</td>
                    <td class="inputBox">
                        <input type="password" v-model.trim.trim="registerData.password_confirmation" @input="confirmpasdMonitor" autocomplete="off" placeholder="请再次输入密码" maxlength="" >
                        <i @click="deleteConfirm" v-show="inputDelete.password_confirmation" class="iconfont icon-close"></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="regBtn btn">
            <span @click="nowReg" :class="{'noClick':this.$store.state.pageInfo.noClick}">
                立即注册
            </span>
        </div>
    </div>
</template>

<script>
import { Dialog,Toast } from 'vant'
export default {
    name:'register',
    data() {
        return {
            btnTitle:'获取验证码',
            noClick:false,
            registerData:{
                invitation:'',
                identifying:'',
                password:'',
                password_confirmation:'',
                mobile_number:''
            },
            inputDelete:{
                invitation:false,
                identifying:false,
                password:false,
                password_confirmation:false
            }
        }
    },
    components:{
        [Dialog.name]:Dialog,
        [Toast.name]:Toast
    },
    methods: {
        // 监听邀请码
        inviteMonitor(){
            if(this.registerData.invitation.length > 0){
                this.inputDelete.invitation = true
            }else{
                this.inputDelete.invitation = false
            }
        },
        // 监听账号
        identifyingMonitor(){
            if(this.registerData.identifying.length > 0){
                this.inputDelete.identifying = true
            }else{
                this.inputDelete.identifying = false
            }
        },
        //监听登录密码
        pasdMonitor(){
            if(this.registerData.password.length > 0){
                this.inputDelete.password = true
            }else{
                this.inputDelete.password = false
            }
        },
        // 监听确认密码
        confirmpasdMonitor(){
            if(this.registerData.password_confirmation.length > 0){
                this.inputDelete.password_confirmation = true
            }else{
                this.inputDelete.password_confirmation = false
            }
        },
        // 删除邀请码内容
        deleteinvitation(){
            this.registerData.invitation = ''
            this.inputDelete.invitation = false
        },
        //删除账号内容
        deleteidentifying(){
            this.registerData.identifying = ''
            this.inputDelete.identifying = false
        },
        //删除密码内容
        deletePasd(){
            this.registerData.password = ''
            this.inputDelete.password = false
        },
        //删除确认密码内容
        deleteConfirm(){
            this.registerData.password_confirmation = ''
            this.inputDelete.password_confirmation = false
        },
        // 立即注册
        nowReg(){
            let reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
            if(!this.registerData.invitation){
                Toast('邀请码不能为空')
                return
            }
            if(!this.registerData.mobile_number){
                Toast('手机号不能为空')
                return
            }else if(!reg.test(this.registerData.mobile_number)){
                Toast('手机格式不正确')
                return
            }
            if(!this.registerData.identifying){
                Toast('验证码不能为空')
                return
            }else if(this.registerData.identifying.length != 4){
                Toast('验证码只能是4位')
				return
            }
            if(!this.registerData.password){
                Toast('密码不能为空')
                return
            }else if(this.registerData.password.length < 6 || this.registerData.password.length  > 16){
                Toast('密码不能小于6位大于16位')
				return
            }
            if(!this.registerData.password_confirmation){
                Toast('确认密码不能为空')
                return
            }else if(this.registerData.password != this.registerData.password_confirmation){
                Toast('两次输入密码不一致')
                return
            }
            this.$post(window.Glod.api+'register', this.registerData,{
            })
            .then((res) => {
                if(res.status == 1){
                    Toast('注册成功')
                    this.$router.push('/login')
                }
            })
        },
        validateBtn(){
            //倒计时
            let time = 59
            let reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
            if(!this.registerData.mobile_number){
                Toast('手机号不能为空')
                return
            }else if(!reg.test(this.registerData.mobile_number)){
                Toast('手机格式不正确')
                return
            }
            this.noClick = true
            this.btnTitle = '60秒后重试'
            let timer = setInterval(() => {
                if(time == 0) {
                    clearInterval(timer)
                    this.noClick = false
                    this.btnTitle = "获取验证码"
                } else {
                    this.btnTitle = time + '秒后重试'
                    this.noClick = true
                    time--
                }
            },1000)
            this.$post(window.Glod.api+'send_code',{
                mobile_number:this.registerData.mobile_number
            }).then((res)=>{
            })
        },
    },
    mounted() {
        this.$store.state.navShow = false
        this.$store.state.pageInfo.nav = window.Glod.register
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
        let urlhref = document.location.href
        if(urlhref.indexOf('?invitecode=') !== -1){
            this.registerData.invitation = urlhref.split('?invitecode=')[1]
        }
    }
}
</script>

<style scoped lang="less">
</style>
