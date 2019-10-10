<template>
    <div id="common" class="recharge">
        <div class="innerWrap">
            <div class="surperise" v-for="(item, index) in rechargeData" :key="index">
                <router-link :to="{path:'/payment', query:{id:item.id,}}">
                    <img :src="item.avatar" alt="">
                    <div>
                        <strong>{{item.name}}</strong>
                        <!-- <p>{{item.text}}</p> -->
                        <i class="iconfont icon-qianjin"></i>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'recharge',
    data(){
        return{
            rechargeData:[]
        }
    },
    mounted(){
        this.$store.state.pageInfo.nav = window.Glod.recharge
        this.$store.state.navShow = true
        this.$store.state.pageInfo.showBack = false
        this.$store.state.pageInfo.showKefu = false
        this.$fetch(window.Glod.api+'recharge').then((res) => {
            if(res.status == 1){
                this.rechargeData = res.datas
            }
        })
    }
}
</script>

<style scoped lang="less">
    .recharge{
        .innerWrap{
            .surperise{
                background: #fff;
                height: auto;
                margin: 13px 0;
                clear: both;
                position: relative;
                a{
                    color: inherit;
                    background: transparent;
                    text-decoration: none;
                    display: block;
                    height: 66px;
                    padding: 11px 0;
                    img{
                        float: left;
                        width: 54px;
                        height: 44px;
                        border-radius: 4px;
                        margin-left: 18px;
                        margin-right: 12px;
                    }
                    div{
                        float: left;
                        height: auto;
                        width: 234px;
                        line-height: 1.4;
                        strong{
                            font-size: 15px;
                            letter-spacing: 1px;
                            font-weight: 400;
                            color: #000;
                            position: relative;
                            display: block;
                        }
                        p{
                            color: #686868;
                            font-size: 14px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        i{
                            font-size: 20px;
                            color: #989898;
                            position: absolute;
                            top: calc(50% - 12px);
                            right: 5%;
                        }
                    }
                }
                a:active{
                    background-color: #d9d9d9;
                }
            }
        }
    }
</style>
