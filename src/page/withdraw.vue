<template>
    <div id="common" class="withdraw">
        <table class="publicTab">
            <tr>
                <td>
                    账户余额
                </td>
                <td class="inputBox">
                    <input class="cgold" type="text" readonly :value="parseFloat(applyData.coin).toFixed(2)">
                </td>
            </tr>
            <tr>
                <td>
                    提现账户
                </td>
                <td class="inputBox">
                    <input class="cgold" type="text" readonly :value="applyData.bank_account">
                </td>
            </tr>
            <tr>
                <td>
                    提现金额
                </td>
                <td class="inputBox">
                    <input type="number" v-model.trim="withdrawData.coin" placeholder="请输入要提现的金额">
                </td>
            </tr>
            <tr>
                <td>
                    提现密码
                </td>
                <td class="inputBox">
                    <input type="password" v-model.trim="withdrawData.password" placeholder="请输入您的提现密码">
                </td>
            </tr>
        </table>
        <div class="btn" style="margin-top:10px;">
            <span @click="applyMoney" :class="{'noClick':this.$store.state.pageInfo.noClick}">确定</span>
        </div>
        <div class="tips" style="font-size:14px;line-height:20px;">
            {{withdrawTip}}
        </div>
    </div>
</template>

<script>
import { Toast,Dialog } from 'vant'
export default {
    name:'withdraw',
    data(){
        return{
            applyData:{},
            withdrawTip:window.Glod.withdrawTip,
            withdrawData:{
                coin:'',
                password:''
            }
        }
    },
    components:{
        [Toast.name]:name,
        [Dialog.name]:name
    },
    methods: {
        applyMoney(){
            if(!this.withdrawData.coin){
                Toast('请输入提现金额')
                return
            }else if(this.withdrawData.coin < 10){
                Toast('提现金额不得小于10')
                return
            }else if(this.withdrawData.coin > this.applyData.coin){
                Toast('提现金额不得大于账户余额')
                return
            }
            if(!this.withdrawData.password){
                Toast('请输入提现密码')
                return
            }else if(this.withdrawData.password.length < 6 || this.withdrawData.password.length > 16){
                Toast('提现密码不能小于6位或者大于16位')
                return
            }
            this.$post(window.Glod.api+'withdraw',{
                coin:parseFloat(this.withdrawData.coin),
                password:this.withdrawData.password
            }).then((res)=>{
                if(res.status == 1){
                    Toast(res.msg)
                    this.applyData.coin = res.coin
                    this.withdrawData.coin = ''
                    this.withdrawData.password = ''
                }
            })
        }
    },
    mounted() {
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
        this.$fetch(window.Glod.api+'withdraw').then((res)=>{
            this.applyData = res
        })
        this.$store.state.pageInfo.nav = '提现'
        this.$store.state.navShow = false
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
    },
}
</script>

<style scoped lang="less">
</style>
