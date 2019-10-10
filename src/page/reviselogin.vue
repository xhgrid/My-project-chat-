<template>
    <div id="common" class="reviselogin">
        <revisepassword :passwordData="userUpdate" @confirmRevise="loginRevise" :class="{'noClick':this.$store.state.pageInfo.noClick}"></revisepassword>
    </div>
</template>

<script>
import { Toast } from 'vant'
import revisepassword from '../components/revisepassword'
export default {
    name:'reviselogin',
    data(){
        return{
            userUpdate:{
                old_password:'',
                password:'',
                password_confirmation:'' 
            }
        }
    },
    components:{
        revisepassword,
        [Toast.name]:name
    },
    methods: {
        loginRevise(){
            if(!this.userUpdate.old_password){
                Toast('请输入原密码')
                return
            }else if(this.userUpdate.old_password.length < 6 || this.userUpdate.old_password.length > 16){
                Toast('原密码不能小于6位或者大于16位')
                return
            }
            if(!this.userUpdate.password){
                Toast('请输入新密码')
                return
            }else if(this.userUpdate.password.length < 6 || this.userUpdate.old_password.length > 16){
                Toast('新密码不能小于6位或者大于16位')
                return
            }
            if(!this.userUpdate.password_confirmation){
                Toast('请输入确认密码')
                return
            }else if(this.userUpdate.password_confirmation < 6 || this.userUpdate.old_password.length > 16){
                Toast('确认密码不能小于6位或者大于16位')
                return
            }else if(this.userUpdate.password_confirmation !== this.userUpdate.password){
                Toast('两次密码不一致')
                return
            }
            this.$post(window.Glod.api+'set_password', this.userUpdate)
            .then((res) => {
                if(res.status == 1){
                    Toast('修改成功')
                    this.userUpdate.old_password = ''
                    this.userUpdate.password = ''
                    this.userUpdate.password_confirmation = ''
                    localStorage.removeItem('Authorization')
                    localStorage.removeItem('userInfo')
                    this.socketApi.initWebSocket()
                    this.$router.push('/login')
                    setTimeout(() => {
                        Toast('请重新登录')
                    }, 1000);
                }
            })
        }
    },
    mounted() {
        this.$store.state.navShow = false
        this.$store.state.pageInfo.nav = window.Glod.reviselogin
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
    },
}
</script>

<style scoped lang="less">
</style>
