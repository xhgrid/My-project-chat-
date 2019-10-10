<template>
    <div id="common" class="personal">
        <ul>
            <li class="headImg">
                <div>
                    <span>头像</span>
                    <span><img :src="userInfo.avatar" alt=""></span>
                </div>
            </li>
            <li class="otherInfo">
                <div>
                    <span>账号</span>
                    <p>{{userInfo.account}}</p>
                </div>
            </li>
            <li class="otherInfo">
                <div>
                    <span>昵称</span>
                    <p><input type="text" v-model.trim="userInfo.nickname"></p>
                </div>
            </li>
        </ul>
        <div class="btn">
            <span @click="preserve" :class="{'noClick':this.$store.state.pageInfo.noClick}">
                保存
            </span>
        </div>
    </div>
</template>

<script>
import { Popup,Picker,Toast } from 'vant'
export default {
    name:'personal',
    data(){
        return{
            userInfo:{}
        }
    },
    components:{
        [Popup.name]:Popup,
        [Picker.name]:Picker,
        [Toast.name]:Toast
    },
    methods: {
        // 保存
        preserve(){
            if(!this.userInfo.nickname){
                Toast('昵称不能为空')
                return
            }else if(this.userInfo.nickname.length < 2){
                Toast('昵称不能小于2位')
                return
            }else if(this.userInfo.nickname.length > 16){
                Toast('昵称不能超过16位')
                return
            }
            this.$post(window.Glod.api+'user',{
                nickname:this.userInfo.nickname
            }).then((res)=>{
                if(res.status == 1){
                    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
                    userInfo.nickname = res.nickname
                    this.userInfo.nickname = res.nickname
                    localStorage.setItem('userInfo',JSON.stringify(userInfo))
                    Toast(res.msg)
                }
            })
        }
    },
    mounted() {
        this.$store.state.pageInfo.nav = window.Glod.personal
        this.$store.state.navShow = false
        this.$store.state.pageInfo.showBack = true
        this.$store.state.pageInfo.showKefu = false
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
}
</script>

<style scoped>
.van-picker__cancel{
    color:rgb(153, 153, 153) !important;
}
#common{
    background: #fff !important;
    position: absolute;
    top: 50px;
    bottom: 0;
}
</style>

<style scoped lang="less">
    .personal{
        ul{
            margin: 11px 18px 0 18px;
            .headImg{
                height: 65px;
                line-height: 65px;
                div{
                    width: 100%;
                    height: 50px;
                    span:nth-of-type(1){
                        float: left;
                        font-size: 14px;
                    }
                    span:nth-of-type(2){
                        float: right;
                        img{
                            border-radius: 50%;
                            width: 50px;
                            height: 50px;
                        }
                    }
                }
            }
            .otherInfo{
                position: relative;
                font-size: 14px;
                div{
                    height: 50px;
                    padding: 17px 0;
                    span{
                        float: left;
                    }
                    p{
                        float: right;
                        i{
                            margin-left: 6px;
                            // vertical-align: middle;
                            color: #ccc;
                        }
                        input{
                            border: none;
                            text-align: right;
                        }
                    }
                }
            }
            .otherInfo:after{
                content: "";
                width: 100%;
                height: 1px;
                background: #f2f2f2;
                transform: scaleY(-.5);
                position: absolute;
                display: block;
                top: 0;
                left: 0;
            }
        }
}
</style>
