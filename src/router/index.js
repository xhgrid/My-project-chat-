import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from './define'

Vue.use(Router)

const router = new Router({
    routes: routerConfig,
})

router.beforeEach((to, from, next) => {
    let title = window.Glod.title
    if (to.meta.title) {
        document.title = to.meta.title + ' - ' + title
    } else {
        document.title = title
    }

    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');

        if (token === 'null' || token === '') {
            next('/login');
        } else {
            next();
        }
    }

    if (to.meta.auth) { // 判断该路由是否需要登录权限
        if (localStorage.getItem('Authorization')) {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
})

export default router