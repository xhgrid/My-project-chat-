export default [{
        path: '*',
        redirect: '/'
    },
    {
        path: '/',
        name: 'index',
        component: (resolve) => require(['../page/home.vue'], resolve),
        meta: {
            auth: false,
            title: '首页',
            keepAlive: true
        }
    },
    {
        path: '/home',
        name: 'home',
        component: (resolve) => require(['../page/home.vue'], resolve),
        meta: {
            auth: false,
            title: '首页',
            keepAlive: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: (resolve) => require(['../page/login.vue'], resolve),
        meta: {
            auth: false,
            title: '登录',
            keepAlive: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: (resolve) => require(['../page/register.vue'], resolve),
        meta: {
            auth: false,
            title: '注册',
            keepAlive: true
        }
    },
    {
        path: '/chat',
        name: 'chat',
        component: (resolve) => require(['../page/chat.vue'], resolve),
        meta: {
            auth: false,
            title: '聊天室'
        }
    },
    {
        path: '/help',
        name: 'help',
        component: (resolve) => require(['../page/help.vue'], resolve),
        meta: {
            auth: false,
            title: '资讯',
            keepAlive: true
        }
    },
    {
        path: '/payment',
        name: 'payment',
        component: (resolve) => require(['../page/payment.vue'], resolve),
        meta: {
            auth: true,
            title: '支付',
            keepAlive: true
        }
    },
    {
        path: '/bankcard',
        name: 'bankcard',
        component: (resolve) => require(['../page/bankcard.vue'], resolve),
        meta: {
            auth: true,
            title: '绑定银行卡',
            keepAlive: true
        }
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: (resolve) => require(['../page/recharge.vue'], resolve),
        meta: {
            auth: true,
            title: '充值',
            keepAlive: true
        }
    },
    {
        path: '/centre',
        name: 'centre',
        component: (resolve) => require(['../page/centre.vue'], resolve),
        meta: {
            auth: true,
            title: '个人中心',
            keepAlive: true
        }
    },
    {
        path: '/personal',
        name: 'personal',
        component: (resolve) => require(['../page/personal.vue'], resolve),
        meta: {
            auth: true,
            title: '个人资料',
            keepAlive: true
        }
    },
    {
        path: '/traderecord',
        name: 'traderecord',
        component: (resolve) => require(['../page/traderecord.vue'], resolve),
        meta: {
            auth: true,
            title: '交易记录',
            keepAlive: true
        }
    },
    {
        path: '/withdraw',
        name: 'withdraw',
        component: (resolve) => require(['../page/withdraw.vue'], resolve),
        meta: {
            auth: true,
            title: '提现',
            keepAlive: true
        }
    },
    {
        path: '/info',
        name: 'info',
        component: (resolve) => require(['../page/info.vue'], resolve),
        meta: {
            auth: false,
            title: '资讯详情',
            keepAlive: true
        }
    },
    {
        path: '/setting',
        name: 'setting',
        component: (resolve) => require(['../page/setting.vue'], resolve),
        meta: {
            auth: false,
            title: '设置',
            keepAlive: true
        }
    },
    {
        path: '/reviselogin',
        name: 'reviselogin',
        component: (resolve) => require(['../page/reviselogin.vue'], resolve),
        meta: {
            auth: false,
            title: '设置登录密码',
            keepAlive: true
        }
    },
    {
        path: '/revisewithdraw',
        name: 'revisewithdraw',
        component: (resolve) => require(['../page/revisewithdraw.vue'], resolve),
        meta: {
            auth: false,
            title: '设置提现密码',
            keepAlive: true
        }
    },
    {
        path: '/todayprofitloss',
        name: 'todayprofitloss',
        component: (resolve) => require(['../page/todayprofitloss.vue'], resolve),
        meta: {
            auth: false,
            title: '今日盈亏',
            keepAlive: true
        }
    },
    {
        path: '/share',
        name: 'share',
        component: (resolve) => require(['../page/share.vue'], resolve),
        meta: {
            auth: false,
            title: '我要分享',
            keepAlive: true
        }
    },
    {
        path: '/about',
        name: 'about',
        component: (resolve) => require(['../page/about.vue'], resolve),
        meta: {
            auth: false,
            title: '关于我们',
            keepAlive: true
        }
    }
]