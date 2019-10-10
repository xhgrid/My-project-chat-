import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)


//设置全局axios默认值
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//创建一个axios实例
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use = instance.interceptors.request.use;

//http request 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization')
        }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.status == 4006) {
            Toast('缓存已失效，请重新登录')
            localStorage.removeItem('Authorization')
            router.push({
                path: "/login",
                querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
            })
        }
        if (response.data.status == 4003) {
            localStorage.removeItem('Authorization')
            Toast('账号或密码错误')
            router.push({
                path: "/login",
                querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
            })
        }
        if (response.data.status == 4004) {
            Toast('系统维护。。。')
        }
        if (response.data.status == 4001) {
            localStorage.removeItem('Authorization')
            Toast(response.data.msg)
        }
        if (response.data.status == 4008) {
            Toast('账号或密码错误')
        }
        if (response.data.status == 4051) {
            Toast('系统维护。。。')
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    let showLoading = true
    if (params.p) {
        showLoading = false
    }
    return new Promise((resolve, reject) => {
        if (showLoading) {
            this.$store.commit('showLoading')
        }
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
                if (showLoading) {
                    this.$store.commit('hideLoading')
                }
            })
            .catch(err => {
                Toast('网络连接错误')
                this.$store.commit('hideLoading')
            })
    })
}

export function fetchs(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                Toast('网络连接错误')
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
                if (response.data.status == -2) {
                    for (const key in response.data.msg) {
                        Toast(response.data.msg[key][0])
                    }
                } else if (response.data.status == 0) {
                    Toast(response.data.msg)
                }
            }, err => {
                Toast('网络连接错误')
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                Toast('网络连接错误')
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                Toast('网络连接错误')
            })
    })
}