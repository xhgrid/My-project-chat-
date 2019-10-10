<template>
    <div class="chat">
        <div class="chatBox">
            <div class="scrollBox bscroll" ref="bscroll" :class="{'startChat':startPage}" @click="inputBlur">
                <ul class="msgList bscroll-container">
                    <li v-for="(item, index) in BackData" :key="index">
                        <div>
                            <message @bigImg="bigImgShow($event)" @openRedbag="openRedbagShow(item)" :className="[item.user_id == id && item.user_id != -1?'myMsg':'otherMsg',item.redbagOpacity == true?'redbagOpacity':'']" :chatTime="item.chatTime" :avatar="item.avatar" :uid="item.user_id" :type="item.message_type" :time="item.time" :user="item.nickname" :content="item.content" :redbagType="item.red_bag_type"></message>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 聊天输入框 -->
            <div class="sendInputBox">
                <div class="btnStyle twoBtnStyle">
                    <p >
                        <textarea class="autoTextarea" type="text" v-model="inputText" ref="elememt" @blur="inputBlur" @focus="openInput" @input="autoTextarea" :placeholder="'说点什么吧'"></textarea>
                    </p>
                    <em class="hairLeft">
                        <i class="iconfont icon-smile" v-show="!emojiShow" @click="openEmoji"></i>
                        <i class="iconfont icon-jianpan" v-show="emojiShow" @click="openKeybd"></i>
                    </em>
                    <em class="hairRight">
                        <i class="iconfont icon-jia1" v-show="!msgIconShow"  @click="openExpand"></i>
                        <span class="hairMsg" v-show="msgIconShow" @click="sendMsg">
                            <i class="iconfont icon-fasong"></i>
                        </span>
                    </em>
                </div>
                <div class="chat-emoji-box" :class="expandShow || emojiShow == true?'padding8':'padding0'">
                    <!-- 表情开始 -->
                    <van-swipe v-show="emojiShow" :width="335"  :initial-swipe="0" :indicator-color="'#ed4858'">
                        <van-swipe-item v-for="n in Math.ceil(emoji.length/21)" :key="n">
                            <li v-for="(item, index) in getEmotionData(n,21)" @click="addEmoji(item.code)" :key="index">{{item.code}}</li>
                        </van-swipe-item>
                    </van-swipe>
                    <!-- 拓展开始 -->
                    <van-swipe v-show="expandShow" :width="335" :initial-swipe="0" :indicator-color="'#ed4858'">
                        <van-swipe-item>
                            <em class="tupianIcon">
                                <van-uploader :after-read="onRead" :max-size="imageMax" multiple>
                                    <i class="iconfont icon-tupian"></i>
                                </van-uploader>
                            </em>
                            <i @click="openBottomForm" v-if="redbagBan" class="iconfont icon-ai-hongbao"></i>
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </div>
            <!-- 图片放大 -->
            <transition name="fade" v-if="showImg">
                <div class="enlargeImg" @click="smallImg">
                    <img :src="bigImg" alt="">
                </div>
            </transition>
            <!-- 蒙层 -->
            <van-popup v-model="redTip"></van-popup>
            <!-- 领取红包 -->
            <div class="redTip redMiss" v-if="redTip">
                <img class="redTipBg" src="../../static/grapRed.png" alt="">
                <img @click="openRedbagMoney" :style="{transform:'rotateY('+deg+'deg)',transition: 'All '+ degTime +'s linear'}" class="kai" src="../../static/kai.png" alt="">
                <h6 @click="openRedList">去看看其它人手气>></h6>
                <i @click="closeredTip" class="iconfont icon-close"></i>
                <!-- <i @click="closeredTip" id="iconCloseTwo" class="iconfont icon-close"></i> -->
            </div>
            <!-- 领取详情 -->
            <redHead v-show="redListShow" @returnUpper="offRedList" :nav="'红包详情'" />
            <div class="redList" v-show="redListShow">
                <van-list>
                    <div class="listMain">
                        <div><img :src="redBagInfo.avatar" alt="">{{redBagInfo.nickname}}的红包</div>
                        <h5>{{redBagInfo.description}}</h5>
                        <img v-if="redBagUserList != null" :src="redBagUserList.avatar" alt="">
                        <p class="" v-if="redBagUserList != null">{{parseFloat(redBagUserList.money*0.01).toFixed(2)}}</p>
                        <p class="" v-if="redBagUserList != null">已存入余额，可直接消费</p>
                    </div>
                    <div class="listContent">
                        <div class="header">
                            <span>已领取{{receivedLen}}/{{redBagInfo.count}}个，{{parseFloat(surplusMoney).toFixed(2)}}/{{parseFloat(redBagInfo.sum_money*0.01).toFixed(2)}}元</span>
                            <span style="color:red;" v-if="redBagInfo.return_number">(返点尾数{{redBagInfo.return_number}})</span>
                        </div>
                        <ul>
                            <li v-for="(item, index) in redBagList" :key="index">
                                <p><img :src="item.avatar" alt=""></p>
                                <p>{{item.nickname}}<span class="time">{{item.rob_time.substring(item.rob_time.length - 8)}}</span><i class="bomb"></i></p>
                                <p class="listMoney">{{parseFloat(item.money*0.01).toFixed(2)}} 元
                                    <span class="best" v-if="receivedLen == redBagInfo.count && item.money == redBagInfo.best_money">
                                        <b class="crown"></b>手气最佳
                                    </span>
                                    <i v-if="chatData.room_type != 'series' && item.is_return == 1" class="bomb"></i>
                                    <i v-if="chatData.room_type == 'series' && item.is_return == 1 && receivedLen == redBagInfo.count" class="bomb"></i>
                                </p>
                            </li>
                        </ul>
                    </div>
                </van-list>
                <!-- 拖拽 -->
                <div v-show="redListShow" @click="offRedList" class="dragBox">
                    退
                </div>
            </div>
            <!-- 底部popup -->
            <van-popup 
            round
            position="bottom"
            :style="{ height: 'auto' }"
            v-model="bottomPopup"
            >
                <!-- 红包表单 -->
                <div class="bottomPop">
                    <h3>发红包</h3>
                    <div class="layermend" @click="bottomPopup = !bottomPopup"></div>
                    <div class="layermcont">
                        <span v-show="cozyTipShow" class="tip">{{cozyTip}}</span>
                        <div>
                            <div class="inputBox">
                                <span>总金额</span>
                                <span class="inputL">
                                    <input @input="verifitionSum" v-model.trim="redBagData.sum" type="number" placeholder="0.00">&nbsp;元
                                </span>
                            </div>
                            <div class="inputBox">
                                <span>红包个数</span>
                                <span class="inputL">
                                    <input :class="{'noClick':noClickNumber}" @input="verifitionCount" v-model.trim="redBagData.count" type="number" placeholder="填写个数">&nbsp;个
                                </span>
                            </div>
                            <div class="inputBox" v-if="returnNumber">
                                <span>返点尾数</span>
                                <span class="inputL">
                                    <input v-model.trim="redBagData.return_number" type="text" placeholder="填写尾数" maxlength="1">
                                </span>
                            </div>
                            <div class="inputBox" v-if="!noClickNumber">
                                <span>留言</span>
                                <span class="inputL">
                                    <input v-model.trim="redBagData.description" type="text" placeholder="恭喜发财，大吉大利" maxlength="20">
                                </span>
                            </div>
                            <div class="inputBox">
                                <span>密码</span>
                                <span class="inputL">
                                    <input v-model.trim="redBagData.password" type="password" placeholder="填写密码">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="layermbtn">
                        <span @click="sendRedBag" :class="{'noClick':this.$store.state.pageInfo.noClick}">确定</span>
                    </div>
                </div>
            </van-popup>
            <!-- 底部popup -->
            <van-popup 
            round
            position="bottom"
            :style="{ height: 'auto' }"
            v-model="bottomPopupConnect"
            >
                <!-- 接龙红包表单 -->
                <div class="bottomPop">
                    <h3>{{redbagFromTtile}}</h3>
                    <div class="layermend" @click="bottomPopupConnectOff"></div>
                    <div class="layermcont">
                        <span class="tip">{{connectPopupTime+'秒后自动关闭'}}</span>
                        <div>
                            <div class="inputBox">
                                <span>总金额</span>
                                <span class="inputL">
                                    <input readonly type="text" :placeholder="redbagFromContent.red_bag_sum">&nbsp;元
                                </span>
                            </div>
                            <div class="inputBox">
                                <span>红包个数</span>
                                <span class="inputL">
                                    <input readonly type="text" :placeholder="redbagFromContent.red_bag_count">&nbsp;个
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="layermbtn">
                        <span @click="sendRedBagConnect(redbagFromContent)">确定</span>
                    </div>
                </div>
            </van-popup>
            <!-- 抢红包提示音 -->
            <audio ref="openRedbagMusic" id="openRedbagMusic" src="../../static/openRedbag.mp3"></audio>
            <!-- 红包推送提示音 -->
            <audio ref="redbagTipsMusic" id="redbagTipsMusic" src="../../static/redbagTips.mp3"></audio>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import chatHead from '../components/head'
import message from '../components/chatParts/message'
import redHead from '../components/chatParts/header'
import { Popup,Uploader,Swipe,SwipeItem,Toast,Notify,List,Dialog } from 'vant'
import Vue from 'vue'
export default {
    name:'',
    data() {
        return {
            id:'',//当前用户id
            fd:'',//websocket连接id
            time:0,//时间
            showImg:false,//图片放大
            bigImg:'',//放大图片的地址
            cozyTip:'',//红包表单提示
            redTipOne:'',
            redTipTwo:'',
            redBagId:'',//红包id
            hiddenTime:0,
            deg:0,
            degTime:0,
            cozyTipShow:false,
            redTip:false,//红包蒙层
            noClickNumber:false,//固定红包不可编辑
            redListShow:false,//红包详情显示
            bottomPopup:false,//底部红包弹出框
            bottomPopupConnect:false,//底部红包弹出框(接龙)
            connectPopupTime:0,//底部红包弹出框自动关闭时间(接龙)
            msgIconShow:false,//发送
            expandShow:false,//拓展
            emojiShow:false,//表情
            returnNumber:false,//返点尾数
            startPage:true,//初始化页面透明
            redbagBan:true,//隐藏发红包功能
            maxHeight:80,
            minHeight:40,
            inputText:'',
            emoji:window.Glod.emoji,
            imageMax:window.Glod.imageMax,
            redbagFromTtile:window.Glod.openRedbagtip,
            redbagFromContent:{},//红包表单展示(接龙)
            currentRedbag:{},//当前红包详情
            redBagInfo:{},//红包详情
            redBagUserList:{},//当前用户红包领取详情
            redBagList:{},//红包列表
            receivedLen:'',//已领取
            surplusMoney:0,//剩余金额
            chatData:{},//首页存储数据
            redBagData:{
                sum:'',
                count:'',
                return_number:'',
                description:'',
                password:''
            },
            BackData:[],
            redBagSign:[]
        }
    },
    components:{
        message,
        redHead,
        chatHead,
        [Popup.name]:Popup,
        [Uploader.name]:Uploader,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [Toast.name]:Toast,
        [Notify.name]:Notify,
        [List.name]:List,
        [Dialog.name]:Dialog
    },
    created(){
        this.websocketIntoRoom()
        this.obtainData()
    },
    methods: {
        switchTime(time){
            var date = time ? new Date(time) : new Date()
		    return Math.round(new Date(time.replace(/-/g, '/')).getTime() / 1000)
        },
        //进入房间
        websocketIntoRoom(){
            let chatData = JSON.parse(localStorage.getItem('chatData'+this.$route.query.id))
            let sendData = {
                room_id: chatData.id,
                message_type: 'into_room',
                room_type: chatData.room_type
            }
            this.socketApi.sendSock(sendData)
        },
        addEmoji(i){
            this.inputText += i
            if(this.inputText.length > 0){
              this.msgIconShow = true
            }else{
              this.msgIconShow = false
            }
        },
        getEmotionData(pageNow, pageSize) {
            return this.emoji.slice((pageNow - 1) * pageSize, pageSize * pageNow)
        },
        // 输入框高度自适应
        autoTextarea() {
            if(this.inputText.length > 0){
                this.msgIconShow = true
            }else{
                this.msgIconShow = false
            }
            var extra = 0, //设置光标与输入框保持的距离(默认0)
            maxHeight = this.maxHeight //设置最大高度(可选)
            var _that = this
            var isFirefox = !!document.getBoxObjectFor || "mozInnerScreenX" in window,
            isOpera = !!window.opera && !!window.opera.toString().indexOf("Opera")
            var paddingTop, paddingBottom
            var style, _length, valueLength, stylHeight, scrollHeight, currHeight;
            this.$nextTick(function() {
                if (this.isHeight) {
                    this.isHeight = false
                    this.minHeight = parseFloat(
                    window.getComputedStyle(this.$refs.elememt).height
                )
            }
            paddingTop = parseInt(
                window.getComputedStyle(this.$refs.elememt).paddingTop
            )
            paddingBottom = parseInt(
                window.getComputedStyle(this.$refs.elememt).paddingBottom
            )
            style = this.$refs.elememt.style
            _length = this.$refs.elememt._length
            valueLength = this.$refs.elememt.value.length
            stylHeight = this.$refs.elememt.style.height
            scrollHeight = this.$refs.elememt.scrollHeight
            currHeight = this.$refs.elememt.currHeight
            change()
        })
        function change() {
            var height,padding = 0
            if (_length === valueLength) return;
            _length = valueLength
            if (!isFirefox && !isOpera) {
                padding = paddingTop + paddingBottom
            }
            stylHeight = _that.minHeight + "px"; //30px
            if(scrollHeight > _that.minHeight){
                if(maxHeight && scrollHeight > maxHeight) {
                    height = maxHeight - padding
                    style.overflowY = "auto"
            }else{
                height = scrollHeight - padding //undefined 30 9
                style.overflowY = "hidden"
            }
                style.height = height + extra + "px";
                currHeight = parseInt(style.height);
                }
            }
        },
        // 初始化BScroll
        scrollFn(){
            this.$nextTick(()=>{
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.bscroll, {
                        click: true,
                        scrollY: true,
                        probeType: 3
                    })
					this.scroll.on('scroll', (pos) => {
                        this.scroll.refresh()
                    })
                    this.scroll.on('scrollStart',(pos)=>{
                        this.emojiShow = false
                        this.expandShow = false
                        this.$el.querySelector('.autoTextarea').blur()
                    })
                }else{
                    this.scroll.refresh()
                }
                setTimeout(() => {
                    this.scroll.scrollTo(0,this.scroll.maxScrollY)
                    this.startPage = false
                }, 500)
            })
        },
        // 输入框失去焦点
        inputBlur(){
            setTimeout(() => {
                if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                    return
                }
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { // 判断iPhone|iPad|iPod|iOS
                    this.valRes = 'ios'
                } else if (/(Android)/i.test(navigator.userAgent)) { // 判断Android
                    this.valRes = 'android'
                }
                if (this.valRes === 'ios') {
                    document.activeElement.scrollIntoViewIfNeeded(true)
                }
            }, 10)
            this.$el.querySelector('.autoTextarea').blur()
            this.expandShow = false
            this.emojiShow = false
        },
        // 图片放大
        bigImgShow(e){
            this.showImg = true
            let src = e.toElement.currentSrc
            this.bigImg = src
        },
        // 图片还原
        smallImg(){
            this.showImg = false
        },
        // 关闭红包
        closeredTip(){
            this.redTip = !this.redTip
            this.show = !this.show
        },
        // 关闭红包详情
        offRedList(){
            this.redListShow = false
        },
        // 打开红包表单
        openBottomForm(){
            this.bottomPopup = !this.bottomPopup
            this.expandShow = false
        },
        // 打开表情包
        openEmoji(){
            this.emojiShow = !this.emojiShow
            this.expandShow = false
            this.scrollToBottom()
        },
        // 打开输入键盘
        openKeybd(){
            this.emojiShow = !this.emojiShow
            this.expandShow = false
        },
        // 打开拓展功能
        openExpand(){
            this.expandShow = !this.expandShow
            this.emojiShow = false
        },
        // 滚动到底部
        scrollToBottom(){
            this.$nextTick(function(){
                setTimeout(() => {
                    this.scroll.scrollTo(0,this.scroll.maxScrollY)
                }, 500)
            })
        },
        // 输入框获取焦点
        openInput(){
            this.scrollToBottom()
            let ua = navigator.userAgent.toLowerCase()
            if (ua.indexOf("android") > 0) {
                this.expandShow = false
                this.emojiShow = false
            }else{
                this.expandShow = false
            }
        },
        //获取数据
        obtainData(){
            let that = this
            this.socketApi.websock.onmessage = function(e){
                const redata = JSON.parse(e.data)
                if(redata.socket_type == 'open'){
                    that.fd = redata.fd
                }else if(redata.socket_type == 'message'){
                    if(redata.message_type == 'error'){
                        Toast(redata.msg)
                    }else if(redata.message_type == 'success'){
                        Toast.success(redata.msg)
                    }else if(redata.message_type == 'fail'){
                        Toast.fail(redata.msg)
                    }else if(redata.message_type == 'info'){
                        Toast(redata.msg)
                    }else if(redata.message_type == 'warning'){
                        Toast(redata.msg)
                    }else if(redata.message_type == 'into_room'){

                    }else if(redata.message_type == 'tip_send_series_red_bag'){
                        if(that.bottomPopupConnect != true){
                            let flag = 1
                            that.redbagFromContent = redata
                            that.connectPopupTime = window.Glod.redBagTimeInterval
                            Dialog.alert({
                                title: '温馨提示',
                                message: that.redbagFromTtile
                            }).then(() => {
                                flag = 2
                                that.bottomPopupConnect = true
                                let timer = setInterval(() => {
                                    if(that.connectPopupTime == 0){
                                        clearInterval(timer)
                                    }else{
                                        that.connectPopupTime --
                                    }
                                }, 1000)
                            });
                            setTimeout(() => {
                                Dialog.close()
                                if(flag != 2){
                                    that.bottomPopupConnect = true
                                    let timer = setInterval(() => {
                                        if(that.connectPopupTime == 0){
                                            clearInterval(timer)
                                        }else{
                                            that.connectPopupTime --
                                        }
                                    }, 1000)
                                }else{
                                    return
                                }
                            }, 3000);
                        }
                    }else{
                        let messageType = window.Glod.messageType
                        if(redata.room_id == that.$route.query.id){
                            if(messageType.indexOf(redata.message_type) > -1){
                                that.BackData.push(redata)
                                let chatTime = that.switchTime(redata.time)
                                if(chatTime - that.time > window.Glod.chatTimeInterval){
                                    Vue.set(redata,'chatTime',true)
                                }else{
                                    Vue.set(redata,'chatTime',false)
                                }
                                that.time = chatTime
                                that.scroll.refresh()
                                that.scrollToBottom()
                            }
                            if(redata.message_type == 'red_bag'){
                                let audio = that.$refs.redbagTipsMusic
                                audio.currentTime = 0
                                audio.play()
                            }
                        }
                    }
                }
            }
        },
        bottomPopupConnectOff(){
            this.bottomPopupConnect = false
        },
        // 接龙红包发送
        sendRedBagConnect(item){
            this.$post(window.Glod.api+'send_series_red_bag',{
                red_bag_id:item.red_bag_id,
                room_id:item.room_id
            }).then((res) =>{
                this.bottomPopupConnect = false
            })
        },
        // 发送消息
        sendMsg(){
            let sendData = {
                message_type:'text',
                content: this.inputText
            }
            if(this.inputText.length > 0){
                this.socketApi.sendSock(sendData)
                this.$refs.elememt.style.height = '38px'
                if(this.emojiShow == true){
                    this.emojiShow = false
                }else{
                    let u = navigator.appVersion
                    let uc = u.split('UCBrowser/').length > 1  ? 1 : 0
                    if(!uc){
                        this.$el.querySelector('.autoTextarea').focus()
                    }
                }
            }
            this.inputText = ''
            this.msgIconShow = false
        },
        // 发送图片
        onRead(file){
            let sendData = {
                message_type:'base64_image',
                content: file.content
            }
            this.socketApi.sendSock(sendData)
            this.expandShow = false
        },
        //发送红包
        sendRedBag(){
            if(this.chatData.room_type == 'mine'){
                this.sweepBag()
                this.otherRedbag('mine_red_bag')
            }else if(this.chatData.room_type == 'series'){
                this.sweepBag()
                this.otherRedbag('series')
            }else{
                this.returnNumber = false
                this.sweepBag()
                this.otherRedbag('red_bag')
            }
        },
        // 发送其他红包请求
        otherRedbag(type){
            if(this.cozyTipShow != true){
                this.$post(window.Glod.api+'send_red_bag',{
                    password:this.redBagData.password,
                    sum:this.redBagData.sum*100,
                    message_type:type,
                    count:this.redBagData.count,
                    room_type:this.chatData.room_type,
                    room_id:this.chatData.id,
                    return_number:this.redBagData.return_number,
                    description:this.redBagData.description
                }).then((res)=>{
                    if(res.status == 1){
                        if(this.chatData.count_type == 2){
                           this.redBagData = {
                                sum:'',
                                count:this.redBagData.count,
                                return_number:'',
                                description:'',
                                password:''
                            } 
                        }else{
                            this.redBagData = {
                                sum:'',
                                count:'',
                                return_number:'',
                                description:'',
                                password:''
                            } 
                        }
                        this.bottomPopup = false
                    }
                })
            }
        },
        // 打开红包蒙层
        openRedbagShow(item){
            this.currentRedbag = item
            this.redBagId = item.content.red_bag
            if(item.redbagOpacity){
                if(item.redbagOpacity == false){
                    this.redTip = true
                }else{
                    this.openRedList()
                }
            }else{
                this.redTip = true
            }
        },
        //打开红包
        openRedbagMoney(){
            this.deg += 3600
            this.degTime += 8
            this.$fetchs(window.Glod.api+'rob_red_bag?message_type=rob_bag&red_bag='+this.currentRedbag.content.red_bag+'&random='+this.currentRedbag.content.random)
            .then((res)=>{
                if(res.status == 1){
                    this.deg = 0
                    this.degTime = 0
                    this.redTip = false
                    this.openRedList()
                    let audio = this.$refs.openRedbagMusic
                    audio.currentTime = 0
                    audio.play()
                    if(this.redBagSign == '' || this.redBagSign == null){
                        this.redBagSign.push(this.redBagId)
                        Vue.set(this.currentRedbag,'redbagOpacity',true)
                        localStorage.setItem('redBagSign',JSON.stringify(this.redBagSign))
                    }else{
                        for (const key in this.redBagSign) {
                            if(this.redBagSign.indexOf(this.redBagId) == -1){
                                this.redBagSign.push(this.redBagId)
                                Vue.set(this.currentRedbag,'redbagOpacity',true)
                                localStorage.setItem('redBagSign',JSON.stringify(this.redBagSign))
                            }
                        }
                    }
                }else{
                    this.deg = 0
                    this.degTime = 0
                    Toast(res.msg)
                }
            })
        },
        // 打开红包详情
        openRedList(){
            this.$fetch(window.Glod.api+'red_bag_log?red_bag='+this.redBagId).then((res)=>{
                if(res.status == 1){
                    this.redTip = false
                    this.redListShow = true
                    this.redBagInfo = res.red_bag
                    this.redBagList = res.log
                    this.redBagUserList = res.user_log
                    this.receivedLen = Object.keys(res.log).length
                    this.surplusMoney = 0
                    for (const key in res.log) {
                        this.surplusMoney += parseFloat(res.log[key].money*0.01)
                    }
                }else{
                    Toast(res.msg)
                }
            })
        },
        //红包验证
        sweepBag(){
            let sum = parseFloat(this.redBagData.sum)
            let count = parseFloat(this.redBagData.count)
            if(this.redBagData.sum == ''){
                this.cozyTipShow = true
                this.cozyTip = '总金额不能为空'
                return
            }
            if(sum < parseFloat(this.chatData.min_money)){
                this.cozyTipShow = true
                this.cozyTip = '总金额不能低于'+parseFloat(this.chatData.min_money)
                return
            }
            if(sum > parseFloat(this.chatData.max_money)){
                this.cozyTipShow = true
                this.cozyTip = '总金额不能高于'+parseFloat(this.chatData.max_money)
                return
            }
            if(this.chatData.count_type !== 2){
                if(this.redBagData.count == ''){
                    this.cozyTipShow = true
                    this.cozyTip = '红包个数不能为空'
                    return
                }
                if(count > this.chatData.count){
                    this.cozyTipShow = true
                    this.cozyTip = '红包个数不能大于'+this.chatData.count+'个'
                    return
                }
            }
            if(this.chatData.room_type == 'welfare'){
                if(this.redBagData.description == ''){
                    this.redBagData.description = '恭喜发财，大吉大利'
                }
            }
            if(this.redBagData.returnNumber > 9){
                this.redBagData.returnNumber = 9
            }
        },
        // 红包表单验证
        verifitionSum(){
            let sum = parseFloat(this.redBagData.sum)
            if(sum < parseFloat(this.chatData.min_money)){
                this.cozyTipShow = true
                this.cozyTip = '总金额不能低于'+parseFloat(this.chatData.min_money)
            }else{
                this.cozyTipShow = false
            }
            if(sum > parseFloat(this.chatData.max_money)){
                this.cozyTipShow = true
                this.cozyTip = '总金额不能高于'+parseFloat(this.chatData.max_money)
            }
        },
        verifitionCount(){
            let count = parseFloat(this.redBagData.count)
            if(this.redBagData.count_type !== 2){
                if(count > this.chatData.count){
                    this.cozyTipShow = true
                    this.cozyTip = '红包个数不能大于'+this.chatData.count+'个'
                }else if(count <= 0){
                    this.cozyTipShow = true
                    this.cozyTip = '红包个数不能小于等于0'
                }
                else{
                    this.cozyTipShow = false
                }
            }
        },
        //初始化聊天室数据
        initializeData(){
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            let redBagSign = JSON.parse(localStorage.getItem('redBagSign'))
            this.chatData = JSON.parse(localStorage.getItem('chatData'+this.$route.query.id))
            if(redBagSign !== null){
                this.redBagSign = redBagSign
            }
            if(localStorage.getItem('userInfo')){
                this.id = userInfo.user_id
            }
            if(this.chatData.room_type == 'mine'){
                this.returnNumber = true
            }else{
                this.returnNumber = false
            }
            if(this.chatData.count_type == 2){
                this.redBagData.count = this.chatData.count
                this.noClickNumber = true
            }
            if(this.chatData.is_show_board == 0){
                this.redbagBan = false
            }
            this.$store.state.navShow = false
            this.$store.state.headerShow = true
            this.$store.state.pageInfo.showBack = true
            this.$store.state.pageInfo.showKefu = false
            this.$store.state.pageInfo.nav = this.chatData.name
            this.$fetch(window.Glod.api+'chat_log/'+this.chatData.room_type+'/'+this.chatData.id,{
                per_page:window.Glod.chatPage
            }).then((res)=>{
                let dataReverse = res.data.reverse()
                for (const key in dataReverse) {
                    let content = JSON.parse(dataReverse[key].content)
                    this.BackData.push(JSON.parse(dataReverse[key].content))
                    let chatTime = this.switchTime(this.BackData[key].time)
                    if(chatTime - this.time > window.Glod.chatTimeInterval){
                        Vue.set(this.BackData[key],'chatTime',true)
                    }else{
                        Vue.set(this.BackData[key],'chatTime',false)
                    }
                    this.time = chatTime
                    // 已抢红包印记
                    for (const keys in redBagSign) {
                        if(String(content.content.red_bag).indexOf(String(redBagSign[keys])) !== -1){
                            Vue.set(this.BackData[key],'redbagOpacity',true)
                        }
                    }
                    this.scrollFn()
                }
            })
        },
        test(){
            let that = this
            document.addEventListener('visibilitychange', function() {
                if (document.visibilityState == 'hidden') {
                    that.hiddenTime = new Date().getTime() //记录页面隐藏时间
                } else {
                    let visibleTime = new Date().getTime()
                    if ((visibleTime - that.hiddenTime) / 1000 > window.Glod.break) { //页面再次可见的时间-隐藏时间>10S,重连
                        that.socketApi.websock.onclose()//主动关闭连接后重连
                        setTimeout(function() {
                            that.socketApi.initWebSocket() //打开连接，使用的vuejs，这是websocket的连接方法
                        }, 1000) //1.5S后重连
                    } else {
                        //还没有到断开的时间
                    }
                }
            })
        }
    },
    mounted() {
        this.test()
        this.initializeData()
    },
    watch: {
        bottomPopup(val){
            if(val == false){
                if(this.chatData.count_type == 2){
                    this.redBagData = {
                        sum:'',
                        count:this.redBagData.count,
                        return_number:'',
                        description:'',
                        password:''
                    } 
                }else{
                    this.redBagData = {
                        sum:'',
                        count:'',
                        return_number:'',
                        description:'',
                        password:''
                    } 
                }
            }
        },
        redBagSign(val){
            if(val.length > window.Glod.redBagSignNumber){
                val.shift(0)
            }
        },
        connectPopupTime(val){
            if(val == 0){
                this.bottomPopupConnect = false
            }
        }
    },
}
</script>

<style>
    #iconCloseTwo{
        position: absolute;
        top: 78%;
        left: 47%;
        margin-left: 0;
        margin-top: 0;
        font-size: 28px;
    }
    .van-overlay{
        background-color: rgba(0,0,0,0.6);
    }
    /* 推送时间 */
    .timeLine{
        text-align: center;
        min-height: 16px;
    }
    .timeLine .time{
        background: none;
        color: #b7b7b7;
        display: inline-block;
        text-align: center;
        font-size: 13px;
    }
    .van-swipe .van-swipe__indicators{
        bottom: 1px;
    }
    .van-swipe .van-swipe__indicators i{
        width: 10px;
        height: 10px;
        background-color: #1989fa;
    }
    .van-notify{
        height: 50px;
        line-height: 34px;
        font-size: 20px;
    }
    .van-dialog__header{
        font-weight: 700px;
        font-size: 24px;
    }
    .padding8{
        padding: 8px;
    }
    .padding0{
        padding: 0;
    }
</style>
<style scoped lang="less">
    .chat{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #ededed !important;
        .chatBox{
            position: relative;
            height: 100%;
            padding-top: 50px;
            .scrollBox{
                height: calc(100% - 55px);
                position: relative;
                overflow-y: auto;
                overflow-x: hidden;
                .msgList{
                    padding: 0 12px;
                    li{
                        margin: 14px 0;
                        color: #434343;
                        position: relative;
                        clear: both;
                        overflow: hidden;
                    }
                    //推送我的文字信息
                    .myMsg{
                        // margin: 14px 0;
                        padding: 4px 50px 0;
                        color: #434343;
                        position: relative;
                        min-height: 54px;
                        clear: both;
                        overflow: hidden;
                        .avatarBox{
                            right: 0;
                            left: auto;
                            width: 40px;
                            height: 40px;
                            // background: #c6c6c6;
                            position: absolute;
                            border-radius: 50%;
                            img{
                                width: 100%;
                                border-radius: 50%;
                            }
                        }
                        .text{
                            word-break: break-word;
                            margin-left: 4px;
                            margin-bottom: 6px;
                            position: relative;
                            p{
                                text-align: right;
                                .name{
                                    color: #7a7a7a;
                                    vertical-align: top;
                                    font-size: 14px;
                                }
                            }
                            .content{
                                background: #95ec69;
                                float: right;
                                vertical-align: top;
                                padding: 6px 9px;
                                margin-top: 7px;
                                font-size: 14px;
                                border-radius: 5px;
                                position: relative;
                                float: right;
                            }
                            .content:before{
                                content: "";
                                display: block;
                                position: absolute;
                                right: -10px;
                                top: 9px;
                                width: 0;
                                height: 0;
                                border-top: 12px solid #95ec69;
                                border-right: 12px solid transparent;
                                -webkit-transform: skewY(10deg);
                                transform: skewY(10deg);
                            }
                        }
                    }
                }
            }
            // 图片放大
            .enlargeImg{
                width: 100%;
                height: 100%;
                background-color: #000;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 801;
                overflow-x: auto;
                img{
                    max-width: 100%;
                    max-height: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate3d(-50%,-50%,0);
                }
            }
            // 领取红包
            .redTip{
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,.3);
                color: #fff;
                z-index: 100;
                text-align: center;
                .redTipBg{
                    position: absolute;
                    width: 224px;
                    top: 45%;
                    left: 50%;
                    margin-top: -108px;
                    margin-left: -112px;
                }
                .kai{
                    width: 80px;
                    height: 80px;
                    position: relative;
                    top: 55%;
                }
                h5{
                    width: 100%;
                    text-align: center;
                    position: absolute;
                    top: 54%;
                    font-weight: 400;
                    color: #ffe79c;
                    font-size: 14px;
                }
                h4{
                    width: 100%;
                    text-align: center;
                    position: absolute;
                    top: 54%;
                    font-weight: 400;
                    color: #ffe79c;
                    margin-top:40px;
                    font-size: 22px;
                }
                h6{
                    width: 100%;
                    text-align: center;
                    position: absolute;
                    top: 54%;
                    font-weight: 400;
                    color: #ffe79c;
                    margin-top:96px;
                    font-size: 13px;
                }
                i{
                    position: absolute;
                    top: 45%;
                    left: 50%;
                    margin-left: 90px;
                    margin-top: -132px;
                    font-size: 28px;
                }
            }
            // 领取详情
            .redList{
                height: 100%;
                overflow-y: auto;
                background: #f6f6f6;
                overflow-x: hidden;
                font-size: inherit;
                -webkit-overflow-scrolling: touch;
                // position: relative;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                .listMain{
                    // top: 50px;
                    position: absolute;
                    height: 228px;
                    width: 100%;
                    color: #fff;
                    background: #e23539;
                    text-align: center;
                    z-index: 1;
                    h5{
                        font-weight: 400;
                        line-height: 15px;
                        color: #fae3b7;
                        font-size: 15px;
                        margin-top: 1px;
                    }
                    div{
                        line-height: 32px;
                        color: #fae3b7;
                        font-size: 17px;
                        margin-top: 47px;
                        font-weight: 600;
                        text-align: center;
                        img{
                            display: inline-block;
                            width: 18px;
                            height: 18px;
                            border-radius: 2px;
                            margin-right: 6px;
                            position: relative;
                            top:-9px;
                        }
                    }
                    img{
                        display: block;
                        margin: 15px auto 0;
                        border-radius: 50%;
                        height: 76px;
                        width: 76px;
                        z-index: 2;
                        position: relative;
                    }
                    p:nth-of-type(1){
                        color: #f4b650;
                        font-size: 30px;
                        font-weight: 700;
                    }
                    p:nth-of-type(2){
                        color: #f4b650;
                        font-size: 14px;
                    }
                    h6{
                        font-size: 18px;
                        color: #0d0d0d;
                        margin-top: 14px;
                        font-weight: 400;
                        line-height: 18px;
                    }
                }
                .listMain:after{
                    content: "";
                    width: 140%;
                    height: 218px;
                    background: #fff;
                    display: block;
                    left: -20%;
                    bottom: -148px;
                    border-radius: 50%;
                    position: absolute;
                    z-index: -1;
                }
                .listContent{
                    background: #fff;
                    width: 100%;
                    min-height: 100%;
                    padding: 244px 0 11px;
                    .header{
                        font-size: 14px;
                        line-height: 45px;
                        position: relative;
                        padding: 0 12px;
                        color: #ccc;
                        z-index: 2;
                        border-bottom: 1px solid #f1f1f1;
                        span{
                            text-align: left;
                            display: inline-block;
                        }
                    }
                    ul{
                        position: relative;
                        z-index: 2;
                        li{
                            font-size: 13px;
                            position: relative;
                            margin-top: 11px;
                            p{
                                color: #0d0d0d;
                                display: inline-block;
                                height: 45px;
                                vertical-align: top;
                                line-height: 20px;
                                img{
                                    border-radius: 50%;
                                    height: 45px;
                                    width: 45px;
                                }
                                .time{
                                    display: block;
                                    font-size: 13px;
                                    color: #aaa;
                                    line-height: 24px;
                                }
                            }
                            p:first-child{
                                margin-left: 12px;
                            }
                            p:last-child{
                                margin-right: 12px;
                            }
                            .listMoney{
                                position: absolute;
                                right: 0;
                                text-align: right;
                                .best{
                                    color: #e53333;
                                    display: block;
                                    font-size: 14px;
                                    b{
                                        width: 18px;
                                        height: 18px;
                                        display: inline-block;
                                        vertical-align: text-bottom;
                                        margin-right: 4px;
                                    }
                                    .crown{
                                        background: url('../../static/bestAward.png') no-repeat 50%;
                                        background-size: 100%;
                                    }
                                }
                                .bomb{
                                    width: 18px;
                                    height: 18px;
                                    display: inline-block;
                                    position: absolute;
                                    bottom: 5px;
                                    right: 220px;
                                    background: url('../../static/Bomb.png') no-repeat 50%;
                                    background-size: 100%;
                                }
                            }
                        }
                        li:nth-child(n+2):before{
                            display: block;
                            content: "";
                            height: 1px;
                            -webkit-transform: scaleY(.5);
                            transform: scaleY(.5);
                            background: #f1f1f1;
                            margin-bottom: 10px;
                        }
                    }
                }
                // 返回按钮
                .dragBox{
                    position: fixed;
                    right: 30%;
                    top: 48%;
                    line-height: 20px;
                    width: 56px;
                    height: 56px;
                    padding: 11px;
                    text-align: center;
                    border-radius: 50%;
                    color: #fff;
                    z-index: 2001;
                    background: linear-gradient(180deg,#69e5a7 0%,#4dcfa1 100%);
                    background-clip: padding-box;
                    text-decoration: none;
                    transition: opacity 0.2s;
                    box-shadow: 0 0 10px rgba(246,133,68, 0.2);
                    opacity: 1;
                    border: 8px solid rgba(246,133,68, 0.32);
                    font-size: 20px;
                    opacity: 0.7;
                }
            }
            // 发红包
            .bottomPop{
                height: auto;
                h3{
                    height: 52px;
                    box-shadow: 0 2px 2px 0 rgba(0,0,0,.11);
                    color: #303030;
                    font-size: 18px;
                    line-height: 52px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    text-align: center;
                }
                .layermend{
                    position: absolute;
                    right: 7px;
                    top: 10px;
                    width: 30px;
                    height: 30px;
                    border: 0;
                    font-weight: 400;
                    background: transparent;
                    cursor: pointer;
                    -webkit-appearance: none;
                    font-size: 30px;
                }
                .layermend:after{
                    position: absolute;
                    left: 5px;
                    top: 13px;
                    content: '';
                    width: 20px;
                    height: 2px;
                    background-color: rgba(0,0,0,.3);
                    -webkit-transform: rotate(-45deg);
                    border-radius: 3px;
                }
                .layermend:before{
                    position: absolute;
                    left: 5px;
                    top: 13px;
                    content: '';
                    width: 20px;
                    height: 2px;
                    background-color: rgba(0,0,0,.3);
                    -webkit-transform: rotate(45deg);
                    border-radius: 3px;
                }
                .layermcont{
                    font-size: 15px;
                    padding: 10px;
                    color: #666;
                    .tip{
                        color: #e53333;
                        margin-left: 32px;
                    }
                    div{
                        padding: 0 30px;
                        // max-height: 12em;
                        // overflow: scroll;
                        .inputBox{
                            padding: 12px;
                            background: #f6f6f6;
                            border-radius: 8px;
                            display: flex;
                            -ms-flex-pack: justify;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 8px;
                            .inputL{
                                input{
                                    border: none;
                                    -webkit-appearance: none;
                                    text-align: right;
                                    background: #f6f6f6;
                                    max-width: 9em;
                                }
                            }
                        }
                    }
                }
                .layermbtn{
                    padding: 15px 38px;
                    height: auto;
                    span{
                        display: block;
                        height: 43px;
                        line-height: 43px;
                        text-align: center;
                        width: 100%;
                        border-radius: 20px;
                        background: #e53333;
                        font-size: 18px;
                        color: #fff;
                    }
                }
            }
            // 输入框
            .sendInputBox{
                width: 100%;
                position: fixed;
                bottom: 0;
                left: 0;
                padding: 6px 12px;
                background-color: #ededed;
                .twoBtnStyle{
                    padding-right: 80px;
                    // border-radius: 18px;
                }
                .btnStyle{
                    font-size: 13px;
                    position: relative;
                    p{
                        padding: 3px 0 4px;
                        position: relative;
                        textarea{
                            width: 100%;
                            height: 38px;
                            min-height: 38px;
                            max-height: 60px;
                            overflow-y: scroll;
                            outline: none;
                            border: none;
                            vertical-align: bottom;
                            background: transparent;
                            border-radius: 18px;
                            background: #fff;
                            padding-left: 14px;
                            padding-top: 9px;
                            padding-bottom: 9px;
                            overflow: auto;
                        }
                    }
                    em{
                        display: block;
                        position: absolute;
                        bottom: 7px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        color: #fff;
                        border-radius: 5px;
                        vertical-align: bottom;
                        i{
                            color: #b7b7b7;
                            font-size: 34px;
                        }
                    }
                    .hairLeft{
                        right: 42px;
                    }
                    .hairRight{
                        right: 0px;
                        margin-left: 5px;
                        i{
                            font-size: 39px;
                            font-weight: 500;
                        }
                        .hairMsg{
                            height: 30px;
                            width: 30px;
                            line-height: 32px;
                            border-radius: 50%;
                            color: #fff;
                            background: #e53333;
                            bottom: 1px;
                            right: 4px;
                            position: absolute;
                            i{
                                font-size: 24px;
                                color: #fff;
                                background: none;
                                position: relative;
                                left: 2px;
                                top: 0;
                                border-radius: 50%;
                            }
                        }
                    }
                }
                .chat-emoji-box{
                    position: relative;
                    z-index: 1;
                    height: auto;
                    overflow: hidden;
                    width: 100%;
                    margin: 0px auto;
                    list-style: none;
                    li{
                        margin-bottom: 18px;
                        text-align: center;
                        width: 14%;
                        font-size: 20px;
                        float: left;
                    }
                }
                .iconfont{
                    text-align: center;
                    width: 20%;
                    font-size: 32px;
                    float: left;
                }
                .tupianIcon{
                    text-align: center;
                    width: 20%;
                    height: 47px;
                    font-size: 32px;
                    float: left;
                }
                // .chat-expand-box{
                //     position: relative;
                //     z-index: 1;
                //     background-color: #ededed;
                //     padding: 8px;
                //     height: auto;
                //     overflow: hidden;
                //     width: 100%;
                //     margin: 0px auto;
                //     list-style: none;
                //     li{
                //         margin-bottom: 18px;
                //         text-align: center;
                //         width: 20%;
                //         float: left;
                //     }
                // }
            }
        }
    }
</style>
