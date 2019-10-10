<template>
    <div id="common" class="tradeRecord">
        <recordList :tabTitle="tabTitle" @clkTab="cutTab" :cur="cur" ref="touchscroll"></recordList>
        <div class="list" v-if="tabMain != []">
            <van-list
            v-model="loading"
            :finished="finished"
            :offset="300"
            finished-text="已显示全部数据"
            @load="loadMore"
            >
                <div class="scrollBox">
                    <div class="touchScroll">
                        <div v-for="(item, index) in tabMain" :key="index">
                            <router-link to="">
                                <div class="recordInfo">
                                    <p>
                                        {{item.description}}
                                    </p>
                                    <span>{{item.created_at}}</span>
                                </div>
                                <div class="InMoney">
                                    <strong :style="item.coin < 0 ?'color:green;':'color:red;'">{{item.coin}}</strong>
                                    <span>{{item.result}}</span>
                                </div>
                            </router-link>
                            <div class="hr1px"></div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
import { Toast,List } from 'vant'
import recordList from '../components/recordList'
export default {
    name:'traderecord',
    data(){
        return{
            tabTitle: ['账户明细', '充值记录', '提现记录'],
            tabMain: [],
            cur:0,
            page:8,
            finished:false,
            loading:false,
            parmes:{
                page:1
            }
        }
    },
    components:{
        recordList,
        [Toast.name]:Toast,
        [List.name]:List
    },
    methods: {
        cutTab(i){
            this.cur = i
            this.page = 8
            this.tabMain = []
            this.$fetch(window.Glod.api+'transaction/'+this.cur).then((res) =>{
                for (const key in res.datas) {
                    this.tabMain.push(res.datas[key])
                }
            })
        },
        loadMore(){
            this.$fetchs(window.Glod.api+'transaction/'+this.cur,this.parmes).then((res) =>{
                for (const key in res.datas) {
                    this.tabMain.push(res.datas[key])
                }
                if(res.current_page >= res.last_page) {
                    this.loading = false
                    this.finished = true
                } else {
                    this.parmes.page = res.current_page+1
                    this.loading = false
                }
            })
        }
    },
    mounted() {
        this.$store.state.pageInfo.nav = window.Glod.traderecord
        this.$store.state.navShow = false
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
    }
}
</script>

<style scoped lang="less">
    #common{
        background-color: #fff !important;
        position: absolute;
        top: 0;
        bottom: 0;
        .list{
            padding-top: 90px;
            .scrollBox{
                .touchScroll{
                    position: relative;
                    width: 100%;
                    padding: 10px 0;
                    background: #fff;
                    overflow-y: auto;
                    // height: calc(100vh - 89px)!important;
                    -webkit-overflow-scrolling: touch;
                    a{
                        display: block;
                        width: 100%;
                        padding: 4px 5%;
                        color: #000;
                        .recordInfo{
                            line-height: 30px;
                            display: inline-block;
                            p{
                                width: 250px;
                                font-size: 15px;
                                color: #333;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                                span{
                                    font-size: 15px;
                                    margin-left: 6px;
                                }
                            }
                            span{
                                font-size: 14px;
                                clear: both;
                                color: #989898;
                            }
                        }
                        .InMoney{
                            // line-height: 30px;
                            display: inline-block;
                            float: right;
                            strong{
                                font-weight: 400;
                                font-size: 15px;
                                float: right;
                                color: red;
                                line-height: 30px;
                            }
                            span{
                                clear: both;
                                font-size: 15px;
                                color: red;
                                float: right;
                            }
                        }
                        strong{
                            line-height: 50px;
                            font-weight: 400;
                            font-size: 15px;
                            float: right;
                            color: #666;
                        }
                    }
                    .msg{
                        height: 54px;
                        text-align: center;
                        font-size: 14px;
                        padding: 20px 0;
                        color: #999;
                    }
                }
            }
        }
    }
</style>
