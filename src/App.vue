<template>
  <div id="app">
    <v-header v-if="this.$store.state.headerShow" @returnUpper="goHome" :nav='this.$store.state.pageInfo.nav' :service='this.$store.state.pageInfo.service' :kefuUrl="this.$store.state.pageInfo.kefuUrl" :showKefu="this.$store.state.pageInfo.showKefu" :showBack="this.$store.state.pageInfo.showBack"></v-header>
    <v-nav v-if="this.$store.state.navShow"></v-nav>
    <loading v-if="loading"></loading>
    <transition :name="transitionName"> 
      <router-view class="Router"></router-view>
    </transition>
  </div>
</template>

<script>
import header from './components/header'
import nav from './components/nav'
import loading from './components/loading'
import { mapState } from 'vuex'
import * as socketApi from '../static/js/socket'
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-right' // 默认动态路由变化为slide-right
    }
  },
  computed: {
    ...mapState([
      'loading'
    ])
  },
  components:{
    'v-header':header,
    'v-nav':nav,
    loading
  },
  methods: {
    goHome(){
      if(this.$route.path == '/login'){
        this.$router.push('/')
      }else{
        this.$router.go(-1)
      }
    }
  },
  mounted() {
  },
  watch: {
　　　'$route' (to, from) {
　　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
　　　　　　if(isBack) {
　　　　　　　 this.transitionName = 'slide-right'
　　　　　　} else {
　　　　　　    this.transitionName = 'slide-left'
　　　　　}
　　this.$router.isBack = false
　　}
　}
}
</script>

<style>
.Router {
  transition: all .2s cubic-bezier(.55,0,.1,1);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(0, 0, -100%);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(0, 0, -100%);
}
</style>

