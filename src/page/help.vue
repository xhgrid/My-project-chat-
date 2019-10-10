<template>
    <div id="common" class="help">
        <van-list
        v-model="loading"
        :finished="finished"
        :offset="10"
        @load="onLoad"
        ref="onLoadone"
        >
            <div class="options">
                <div v-for="(item, index) in list" :key="index">
                    <router-link :to="{path:'/info', query:{id:item.id,title:item.title}}">
                        <span>{{item.title}}</span>
                        <i class="iconfont icon-qianjin"></i>
                    </router-link>
                    <p></p>
                </div>
            </div>
            <div class="msg" v-if="finished">已显示全部数据</div>
        </van-list>
    </div>
</template>

<script>
import { List } from 'vant'
import options from '../components/options'
export default {
    name:'help',
    data(){
        return{
            list: [],
            loading: false,
            finished: false,
            parmes:{
                page:1
            }
        }
    },
    components:{
        [List.name]:List,
        options
    },
    methods: {
        onLoad(){
            this.$fetch(window.Glod.api+'article',this.parmes).then((res) => {
                for (let index = 0; index < res.datas.length; index++) {
                    this.list.push(res.datas[index])
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
        this.$store.state.pageInfo.nav = window.Glod.help
        this.$store.state.navShow = true
        this.$store.state.pageInfo.showBack = false
        this.$store.state.pageInfo.showKefu = false
    },
}
</script>

<style scoped lang="less">
    .help{
        .options{
            margin-top: 11px;
            background-color: #fff;
            div{
                a{
                    width: 100%;
                    display: block;
                    line-height: 33px;
                    padding: 9px 18px;
                    color: #333;
                    span{
                        width: 90%;
                        display: inline-block;
                        font-size: 15px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    i{
                        float: right;
                    }
                }
                p{
                    width: 356px;
                    float: right;
                    height: 1px;
                    background: #f1f1f1;
                    transform: scaleY(.5);
                }
            }
        }
        .msg{
            height: 54px;
            text-align: center;
            font-size: 14px;
            padding: 20px 0 94px 0;
            color: #999;
        }
    }
</style>
