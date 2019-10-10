import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pageInfo: {
            nav: '',
            service: '客服',
            kefuUrl: 'https://www.baicu.com',
            showKefu: false,
            showBack: false,
            noClick: false
        },
        navShow: true,
        headerShow: true,
        loading: false //网页加载loading
    },
    actions: {},
    getters: {},
    mutations: {
        showLoading: function(state) {
            state.loading = true
        },
        hideLoading: function(state) {
            state.loading = false
        }
    }
})