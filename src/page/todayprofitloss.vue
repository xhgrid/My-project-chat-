<template>
    <div id="common" class="todayprofitloss">
        <div class="ag-top">
            <div class="earn">
                <p>个人盈亏 (元)</p>
                <span>暂无数据</span>
            </div>
            <!-- <div class="tip">
                <van-icon class="warning-o" name="warning-o" />
                <span>盈亏计算公式：中奖-投注+活动+返佣+棋牌盈亏</span>
            </div> -->
        </div>
        <div class="ag-bot">
            <div v-for="(item, index) in profitlossData" :key="index">
                <p>{{item.title}}</p>
                <span>{{item.money}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from 'vant'
export default {
    name:'todayprofitloss',
    data(){
        return{
            profitlossData:[
                {
                    title:'个人盈亏 (元)',
                    money:'暂无数据'
                },
                {
                    title:'个人盈亏 (元)',
                    money:'暂无数据'
                },
                {
                    title:'个人盈亏 (元)',
                    money:'暂无数据'
                },
                {
                    title:'个人盈亏 (元)',
                    money:'暂无数据'
                },
            ]
        }
    },
    components:{
        [Icon.name]:Icon
    },
    mounted() {
        this.$store.state.pageInfo.nav = window.Glod.todayProfitLoss
        this.$store.state.navShow = false
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
    },
}
</script>

<style scoped lang="less">
    .todayprofitloss{
        .ag-top{
            position: relative;
            height: 152px;
            width: 100%;
            background: linear-gradient(135deg,#e63028,#ec5639);
            color: #fff;
            .earn{
                text-align: center;
                height: 118px;
                p{
                    font-size: 20px;
                    padding: 28px 0 2px;
                }
                span{
                    font-size: 18px;
                }
            }
            .tip{
                height: 36px;
                background: linear-gradient(95deg,#f79112,#ec5639);
                font-size: 15px;
                line-height: 36px;
                padding-left: 28px;
                position: relative;
                .warning-o{
                    position: absolute;
                    font-size: 18px;
                    left: 10px;
                    top: 8px;
                }
                span{
                    padding-left: 5px;
                }
            }
        }
        .ag-bot{
            display: flex;
            flex-wrap: wrap;
            div{
                width: 33.3%;
                background-color: #fff;
                margin-top: 10px;
                height: 78px;
                position: relative;
                text-align: center;
                font-size: 15px;
                p{
                    color: #777;
                    padding-top: 20px;
                    margin-bottom: 4px;
                }
                span{
                    font-size: 16px;
                    color: #e20606;
                }
            }
            div:after{
                content: "";
                width: 1px;
                height: 42px;
                display: block;
                background: #f2f2f2;
                position: absolute;
                top: 18px;
            }
        }
    }
</style>
