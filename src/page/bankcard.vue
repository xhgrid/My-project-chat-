<template>
    <div id="common" class="bankcard">
        <div v-if="!formShow">
            <table class="publicTab" style="margin-top:16px;">
                <tr>
                    <td>开户人</td>
                    <td class="inputBox">
                        <input v-model.trim="lowerInfo.bank_user" type="text" placeholder="请输入开户人姓名">
                    </td>
                </tr>
                <tr>
                    <td>开户行</td>
                    <td class="inputBox">
                        <input v-model.trim="lowerInfo.bank_name" type="text" placeholder="请输入开户行名称">
                    </td>
                </tr>
                <tr>
                    <td>银行卡号</td>
                    <td class="inputBox">
                        <input v-model.trim="lowerInfo.bank_account" type="number" placeholder="请输入银行卡的卡号">
                    </td>
                </tr>
                <tr>
                    <td>提现密码</td>
                    <td class="inputBox">
                        <input v-model.trim="lowerInfo.password" type="password" placeholder="请设置您的安全密码">
                    </td>
                </tr>
                <tr>
                    <td>确认密码</td>
                    <td class="inputBox">
                        <input v-model.trim="lowerInfo.password_confirmation" type="password" placeholder="请再次输入安全密码">
                    </td>
                </tr>
            </table>
            <div class="btn" style="margin-top:10px;">
                <span @click="define" :class="{'noClick':this.$store.state.pageInfo.noClick}">确定</span>
            </div>
            <div class="tips">
                {{bankcardDataTip}}
            </div>
        </div>
        <div v-if="formShow">
            <table class="publicTab" style="margin-top:16px;">
                <tr>
                    <td>开户人</td>
                    <td class="inputBox">
                        <input type="text" readonly :value="bankInfo.bank_user">
                    </td>
                </tr>
                <tr>
                    <td>开户行</td>
                    <td class="inputBox">
                        <input type="text" readonly :value="bankInfo.bank_name">
                    </td>
                </tr>
                <tr>
                    <td>银行卡号</td>
                    <td class="inputBox">
                        <input type="text" readonly :value="bankInfo.bank_account">
                    </td>
                </tr>
            </table>
            <div class="tips">
                {{bankcardDataTipTow}}
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    name:'',
    data(){
        return{
            bankcardDataTip:window.Glod.bankcardDataTip,
            bankcardDataTipTow:window.Glod.bankcardDataTipTow,
            formShow:false,
            lowerInfo:{
                password:'',
                password_confirmation:'',
                bank_user:'',
                bank_name:'',
                bank_account:''
            },
            bankInfo:{}
        }
    },
    components:{
        [Toast.name]:Toast
    },
    methods: {
        // 确定绑定银行卡
        define(){
            localStorage
            if(!this.lowerInfo.bank_user){
                Toast('开户人不能为空')
                return
            }else if(this.lowerInfo.bank_user.length > 10){
                Toast('开户人不能大于10位')
                return
            }
            if(!this.lowerInfo.bank_name){
                Toast('开户行不能为空')
                return
            }else if(this.lowerInfo.bank_name.length> 20){
                Toast('开户行不能大于20位')
                return
            }
            if(!this.lowerInfo.bank_account){
                Toast('银行卡号不能为空')
                return
            }else if(this.lowerInfo.bank_account.length < 15  || this.lowerInfo.bank_account.length > 20){
                Toast('银行卡号不能小于15位或大于20位')
                return
            }
            if(!this.lowerInfo.password.length){
                Toast('提现密码不能为空')
                return
            }else if(this.lowerInfo.password.length < 4 || this.lowerInfo.password.length >16){
                Toast('提现密码不能小于4位或大于16位')
                return
            }
            if(!this.lowerInfo.password_confirmation){
                Toast('确认密码不能为空')
                return
            }else if(this.lowerInfo.password_confirmation.length  < 6 || this.lowerInfo.password_confirmation.length  > 16){
                Toast('确认密码不能小于6位或大于16位')
                return
            }else if(this.lowerInfo.password !== this.lowerInfo.password_confirmation){
                Toast('两次输入的密码不一致')
                return
            }
            this.$post(window.Glod.api+'withdraw_set',this.lowerInfo)
            .then((res) =>{
                if(res.status == 1){
                    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
                    userInfo.bank_info = res.data
                    localStorage.setItem('userInfo',JSON.stringify(userInfo))
                    this.formShow = true
                    this.bankInfo = userInfo.bank_info
                }
            })
        }
    },
    mounted() {
        this.$store.state.pageInfo.nav = window.Glod.bankcard
        this.$store.state.navShow = false
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
        // 判断本地是否存在银行卡信息
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if(userInfo.bank_info){
            this.formShow = true
            this.bankInfo = userInfo.bank_info
        }
    },
}
</script>

<style scoped lang="less">
</style>
