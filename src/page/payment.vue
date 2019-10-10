<template>
    <div id="common" class="payment">
        <table class="publicTab" v-if="!tabShow">
            <tr>
                <td>
                    当前账号
                </td>
                <td class="inputBox">
                    <input type="text" readonly :value="nickname">
                </td>
            </tr>
            <tr>
                <td>
                    上分数量
                </td>
                <td class="inputBox">
                    <input v-model.trim="bankUser.money" type="number" placeholder="请输入金额">
                </td>
            </tr>
            <tr>
                <td>
                    订单尾号
                </td>
                <td class="inputBox">
                    <input v-model.trim="bankUser.order" type="number" placeholder="请输入转账后的订单号后四位">
                </td>
            </tr>
            <tr class="twoCode">
                <td>
                    扫码支付
                </td>
                <td class="imgCode">
                    <img :src="rechargeInfo.qr_code" alt="">
                </td>
            </tr>
        </table>
        <table class="publicTab" v-if="tabShow">
            <tr>
                <td>
                    收款人
                </td>
                <td class="inputBox">
                    <input type="text" readonly :value="rechargeInfo.bank_user">
                </td>
            </tr>
            <tr>
                <td>
                    收款银行
                </td>
                <td class="inputBox">
                    <input  type="text" readonly :value="rechargeInfo.bank_name">
                </td>
            </tr>
            <tr>
                <td>
                    收款账号
                </td>
                <td class="inputBox">
                    <input type="text" readonly :value="rechargeInfo.bank_account">
                </td>
            </tr>
            <tr>
                <td>
                    汇款人
                </td>
                <td class="inputBox">
                    <input v-model.trim="bankUser.bank_user" type="text" placeholder="请输入汇款人姓名">
                </td>
            </tr>
            <tr>
                <td>
                    汇款账号
                </td>
                <td class="inputBox">
                    <input v-model.trim="bankUser.order" type="text"  placeholder="请输入汇款账号后四位">
                </td>
            </tr>
            <tr>
                <td>
                    汇款金额
                </td>
                <td class="inputBox">
                    <input v-model.trim="bankUser.money" type="number" placeholder="请输入汇款金额">
                </td>
            </tr>
        </table>
        <div class="btn" style="margin-top:10px;">
            <span @click="bankHandler" :class="{'noClick':this.$store.state.pageInfo.noClick}">立即充值</span>
        </div>
        <div class="tips">
            温馨提示：<br>
            {{paymentTip}}
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    name:'payment',
    data(){
        return{
            nickname:'',
            rechargeInfo:{},
            tabShow:false,
            minCoin:0,
            paymentTip:window.Glod.paymentTip,
            bankUser:{
                bank_user:'',
                order:'',
                money:'',
                type_id: this.$route.query.id
            }
        }
    },
    components:{
        [Toast.name]:Toast
    },
    methods: {
        bankHandler(){
            if(this.$route.query.id == window.Glod.bankCode){
                if(!this.bankUser.bank_user){
                    Toast('请填写汇款人姓名')
                    return
                }
                if(!this.bankUser.order){
                    Toast('请填写汇款账号')
                    return
                }else if(this.bankUser.order.length !== 4){
                    Toast('请输入汇款卡号后4位')
                    return
                }
                if(!this.bankUser.money) {
                    Toast('请填写汇款金额')
                    return
                }else if(this.bankUser.money < this.minCoin){
                    Toast('汇款金额不得小于'+this.minCoin)
                    return
                }else if(this.bankUser.money.length > 6){
                    Toast('汇款金额最多6位')
                    return
                }
            }else{
                if(!this.bankUser.money) {
                    Toast('请填写上分数量')
                    return
                }else if(this.bankUser.money < this.minCoin){
                    Toast('上分数量不得小于'+this.minCoin)
                    return
                }else if(this.bankUser.money.length > 6){
                    Toast('上分数量最多6位')
                    return
                }
                if(!this.bankUser.order){
                    Toast('请填写订单尾号')
                    return
                }else if(this.bankUser.order.length !== 4){
                    Toast('请填写订单尾号后四位')
                    return
                }
            }
            this.$post(window.Glod.api+'recharge', this.bankUser)
            .then((res) => {
                if(res.status == 1){
                    Toast(res.msg)
                    this.bankUser.bank_user = ''
                    this.bankUser.order = ''
                    this.bankUser.money = ''
                }
            })
        }
    },
    mounted() {
        this.$store.state.pageInfo.nav = window.Glod.payment
        this.$store.state.navShow = false
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
        if(this.$route.query.id == window.Glod.bankCode){
            this.tabShow = true
        }
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.nickname = userInfo.nickname
        this.$fetchs(window.Glod.api+'recharge/'+this.$route.query.id).then((res)=>{
            this.rechargeInfo = JSON.parse(res.data.info)
            this.minCoin = res.data.min_money
        })
    },
}
</script>

<style scoped lang="less">
    
</style>
