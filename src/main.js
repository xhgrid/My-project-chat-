// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from '../store/store.js'
import '../src/assets/styles/reset.css'
import '../src/assets/styles/public.less'
import '../src/assets/fonts/iconfont.css'
import '../src/assets/fonts/iconfont.ttf'
import '../src/assets/fonts/iconfont.svg'
import '../src/assets/fonts/iconfont.eot'
import '../src/assets/fonts/iconfont.woff'
import 'lib-flexible/flexible'
import { post, fetch, fetchs, patch, put } from './axios.js'
import VueClipboard from 'vue-clipboard2'
import wx from 'weixin-js-sdk'
import * as socketApi from '../static/js/socket'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(wx)
Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$fetchs = fetchs
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$store = store
Vue.prototype.socketApi = socketApi

//定义一个请求拦截器
axios.interceptors.request.use(function(config) {
        //在请求发出之前进行一些操作
        store.state.pageInfo.noClick = true
        return config
    })
    //定义一个响应拦截器
axios.interceptors.response.use(function(config) {
        //在这里对返回的数据进行处理
        store.state.pageInfo.noClick = false
        return config
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'

}).$mount({

})