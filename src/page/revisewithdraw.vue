<template>
    <div id="common" class="revisewithdraw">
        <revisepassword :passwordData="userUpdate" @confirmRevise="withdrawRevise" :class="{'noClick':this.$store.state.pageInfo.noClick}"></revisepassword>
    </div>
</template>

<script>
import { Toast,Dialog } from 'vant'
import revisepassword from '../components/revisepassword'
export default {
    name:'revisewithdraw',
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
        [Toast.name]:name,
        [Dialog.name]:name
    },
    methods: {
        withdrawRevise(){
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
            this.$post(window.Glod.api+'set_withdraw_password', this.userUpdate)
            .then((res) => {
                if(res.status == 1){
                    Toast('修改成功')
                    this.userUpdate.old_password = ''
                    this.userUpdate.password = ''
                    this.userUpdate.password_confirmation = ''
                }
            })
        }
    },
    mounted() {
        this.$store.state.navShow = false
        this.$store.state.pageInfo.nav = window.Glod.revisewithdraw
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
        // 判断本地是否存在银行卡信息
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if(!userInfo.bank_info){
            Dialog.alert({
            message: '请先绑定银行卡',
            confirmButtonText: '前往',
            cancelButtonText: '返回',
            showCancelButton: true
            }).then(() => {
                this.$router.push('/bankcard')
            }).catch(() => {
                this.$router.go(-1)
            });
        }
    },
}
</script>

<style scoped lang="less">
</style>
