<template>
    <div class="home">
        <div class="child-view">
            <div class="homeTop">
                <div class="banner">
                    <van-swipe :autoplay="3000" :height="100">
                        <van-swipe-item v-for="(item, index) in bannerList" :key="index"><img :src="item.content" alt=""></van-swipe-item>
                    </van-swipe>
                </div>
                <div class="notice">
                    <van-notice-bar
                    color="#666"
                    background="#fff"
                    left-icon="volume-o"
                    :text="notice"
                    >
                    </van-notice-bar>
                </div>
                <div class="cardBottom">
                    <div v-for="(item, index) in centreNav" :key="index">
                        <router-link :to="item.path">
                            <i :class="'iconfont '+item.icon"></i>
                            <span>{{item.title}}</span>
                        </router-link> 
                    </div>
                    <div>
                        <a :href="downloadUrl">
                            <i class='iconfont icon-plus-download'></i>
                            <span>APP下载</span>
                        </a>
                    </div>
                    <div class="kefu">
                        <a :href="kefuUrl">
                            <i class='iconfont icon-kefu'></i>
                            <span>在线客服</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="group">
                <div class="groupList" @click="goChat(item)" v-for="(item, index) in lotteryList" :key="index">
                    <img :src="item.avatar" alt="">
                    <div>
                        <p>{{item.name}}</p>
                        <span>{{item.display}}</span>
                    </div>
                </div>
            </div>
            <div class="newsBox" v-show="mengHide">
                <van-pagination 
                v-model="currentPage" 
                :page-count="pageLen"
                mode="simple" 
                prev-text="上一页"
                next-text="下一页"
                @change="pageTurning($event)"
                />
                <ul class="newsPage">
                    <li v-for="(item, index) in screenList" :key="index" v-show="index + 1 == layindex">{{item.content}}</li>
                </ul>
                <span class="newsBoxbtn" @click="offnewsBox">关闭</span>
            </div>
            <van-overlay :show="mengHide" @click="show = false"/>
        </div>
    </div>
</template>

<script>
import spreadList from '../components/spreadList'
import { Swipe, SwipeItem, NoticeBar, Toast, Pagination, Overlay } from 'vant'
export default {
    name: 'home',
    data() {
        return {
            notice:'',
            screenList:[],
            bannerList:[],
            lotteryList:[],
            download:{},
            currentPage: 1,
            mengHide:false,
            pageLen:0,
            layindex:1,
            centreNav:window.Glod.navList,
            kefuUrl:window.Glod.kefuUrl,
            downloadUrl:window.Glod.downloadUrl
        }
	},
	components:{
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [NoticeBar.name]: NoticeBar,
        [Pagination.name]:Pagination,
        [Overlay.name]:Overlay,
        [Toast.name]:Toast,
        spreadList
    },
    created() {
        this.obtainData()
    },
    methods: {
        //弹窗公告页面索引判断
        pageTurning(e){
            if(e >= 1){
                this.layindex = e
            }
        },
        //显示蒙层
        offnewsBox(){
            this.mengHide = false
        },
        // 初次进入首页显示公告弹窗
        shownesPage(){
            var len = this.pageLen
            var time = (new Date()).valueOf()
            if( time - parseInt(localStorage.getItem('time') == null?0:localStorage.getItem('time')) > 36000000 && len > 0){
                localStorage.setItem('time',time)
                this.mengHide = true
            }
        },
        obtainData(){
            let that = this
                this.socketApi.websock.onmessage = function(e){
            }   
        },
        HomeDate(){
            this.$fetch(window.Glod.api).then((res)=>{
                this.lotteryList = res.chat_list
                this.bannerList = res.banner_list
                this.screenList = res.screen_list
                this.pageLen = res.screen_list.length
                for (let index = 0; index < res.notice_list.length; index++) {
                    if(res.notice_list.length > 1){
                        this.notice += res.notice_list[index].content + '　　　　　　　　　　　　　　'
                    }else{
                        this.notice += res.notice_list[index].content
                    }
                }
                this.pageTurning()
                this.shownesPage()
            })
        },
        goChat(item){
            localStorage.setItem('chatData'+item.id,JSON.stringify(item))
            this.$router.push({
                path:'/chat',
                query:{
                    id:item.id
                }
            })
        }
    },
    mounted() {
        if(localStorage.getItem('Authorization')){
            this.$store.state.pageInfo.nav = window.Glod.title
        }else{
            this.$store.state.pageInfo.nav = '未登录'
        }
        this.$store.state.navShow = true
        this.$store.state.headerShow = true
        this.$store.state.pageInfo.showBack = false
        this.$store.state.pageInfo.showKefu = false
        this.HomeDate()
    }
}
</script>

<style>
.van-icon-volume-o{
    color: #e53333;
}
.van-notice-bar{
    height: 32px;
}
body{
    background: #f9f9f9;
}
.van-overlay{
    z-index: 100 !important;
}
</style>

<style scoped lang="less">
    .home{
        position: relative;
        height: 100%;
        padding-top: 50px;
        .child-view{
            width: 100%;
            .homeTop{
                width: 100%;
                background-color: #f9f9f9;
                z-index: 100;
                position: fixed;
                padding-top: 4px;
                .banner{
                    // position: fixed;
                    // left: 1%;
                    width: 98%;
                    margin: 0 auto;
                    height: 100px;
                    z-index: 10;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 5px;
                    }
                }
                .notice{
                    width: 100%;
                    height: 32px;
                }
                .cardBottom{
                    padding: 0 5px;
                    vertical-align: middle;
                    text-align: center;
                    div{
                        a{
                            display: block;
                            float: left;
                            width: 25%;
                            margin-top: 5px;
                            i{
                                display: inline-block;
                                font-size: 32px;
                                color: #e53333;
                                width: 44px;
                                height: 44px;
                            }
                            span{
                                line-height: 28px;
                                font-size: 12px;
                                color: #333;
                                display: block;
                            }
                        }
                    }
                    .kefu{
                        i{
                            position: relative;
                            top: 2px;
                        }
                        .icon-kefu{
                            font-size: 36px;
                        }
                    }
                }
            }
            .group{
                width: 100%;
                height: auto;
                -webkit-overflow-scrolling:touch;
                position: absolute;
                top: 270px;
                padding-bottom: 54px;
                .groupList{
                    width: 94%;
                    margin: 0 auto;
                    color: #333;
                    padding: 8px 0;
                    display: flex;
                    border-bottom: 1px solid #f1f1f1;
                    img{
                        width: 50px;
                        height: 50px;
                        border-radius: 8px;
                    }
                    div{
                        width: 70%;
                        padding-left: 10px;
                        p{
                            width: 100%;
                            font-size: 15px;
                            font-weight: 600;
                            display: inline-block;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        span{
                            width: 100%;
                            line-height: 30px;
                            font-size: 13px;
                            display: inline-block;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                    }
                    i{
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: red;
                        margin-top: 22px;
                    }
                }
            }
            .newsBox{
                width: 86%;
                margin: 0 auto;
                height: auto;
                min-height: 7rem;
                background-color: #fff;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
                z-index: 3001;
                padding-bottom: 1%;
                .newsPage{
                    width: 80%;
                    padding-top: 10px;
                    margin: 0 auto;
                    height: auto;
                    min-height: 5rem;
                    padding-bottom: 1rem;
                    overflow: hidden;
                }
                .newsBoxbtn {
                    width: 64%;
                    height: 28px;
                    line-height: 28px;
                    font-size: 14px !important;
                    margin: auto;
                    color: rgb(255, 255, 255);
                    font-size: 0.875rem;
                    border: 0px;
                    border-radius: 40px;
                    background: linear-gradient(to right, #e54042 0%, #fc6a41 100%);
                    text-align: center;
                    display: block;
                    outline: none;
                    overflow: hidden;
                    margin-bottom: 10px;
                }
            }
            .shareOutside{
                display: flex;
                padding: 20px;
                div{
                    width: 25%;
                    text-align: center;
                    img{
                        width: 40px;
                        height: 40px;
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }
</style>
