window.Glod = {
    // api
    api: '/api/',
    // 网站标题
    title: "红包乐翻天",
    //WebSocket
    // wsuri: 'ws://' + document.domain + '/ws',
    wsuri: 'ws://' + 'xn.swoole.dev' + '/ws',
    websockNumber: 3,
    // 聊天室消息间隔时间
    chatTimeInterval: 30,
    // 聊天室接龙红包提示展示时间
    redBagTimeInterval: 8,
    // 聊天室进入后台重连时间
    break: 10,
    // 默认邀请码
    defaultInvitation: 111222,
    // 聊天室初始化数据条数
    chatPage: 100,
    // 聊天室红包记录条数
    redBagSignNumber: 500,
    // 银联充值状态
    bankCode: 3,
    // 微信分享域名
    wechatShareUrl: 'http://www.ke49k.cn',
    // 第三方注册地址
    registerUrl: 'http://www.ke49k.cn/register_ak.html',
    // 客服地址
    kefuUrl: 'https://tb.53kf.com/code/client/9bcec422f6d6b727ffd6efde6dbfa65a1/1',
    // APP下载地址
    downloadUrl: 'http://www.lishixian.info/ffPrb',
    // 我要分享拼接符
    invitecode: '/home/index.html#/',
    // 页面按钮
    logoutBtn: '退出登录', //登出按钮
    revisePasswordBtn: '确认修改', //修改按钮
    reviselogin: '登录密码设置', //登录密码页面
    revisewithdraw: '提现密码设置', //提现密码页面
    // 页面标题
    setting: '设置',
    help: '资讯',
    login: '登录',
    payment: '支付',
    register: '注册',
    todayProfitLoss: '今日盈亏',
    personal: '个人资料',
    share: '我要分享',
    about: '关于我们',
    bankcard: '绑定银行卡',
    recharge: '选择充值方式',
    traderecord: '交易记录',
    centre: '个人中心',
    number: 0,
    // 页面提示
    bankcardDataTip: '银行卡只能绑定一次，绑定完成不能修改，请仔细操作。',
    bankcardDataTipTow: '您已绑定银行卡，不可更改',
    paymentTip: '我是支付页面的提示我是支付页面的提示我是支付页面的提示我是支付页面的提示',
    withdrawTip: '可提现金额：您的充值本金需要消费满100%方可提款。',
    openRedbagtip: '轮到您发红包了',
    shareTip: '长按下方图片保存，分享朋友圈，轻松赚钱',
    // 图片大小限制
    imageMax: 2097152,
    // 发送聊天室消息时间
    sendTime: 55000,
    // 首页中部导航栏
    navList: [{
            path: '/recharge',
            title: '用户充值',
            icon: 'icon-chongzhi3'
        },
        {
            path: '/withdraw',
            title: '用户提现',
            icon: 'icon-tixian2'
        },
    ],
    // 首页底部公告导航栏
    bottomNav: [{
            name: '消息',
            path: '/home',
            icon: 'icon-xiaoxi1'
        },
        {
            name: '充值',
            path: '/recharge',
            icon: 'icon-chongzhi3'
        },
        {
            name: '资讯',
            path: '/help',
            icon: 'icon-navicon-wzgl'
        },
        {
            name: '我的',
            path: '/centre',
            icon: 'icon-wodeqianfenleishouye'
        }
    ],
    // 个人中心中部导航栏
    centerNav: [{
            path: '/recharge',
            title: '充值',
            icon: 'icon-chongzhi3'
        },
        {
            path: '/withdraw',
            title: '提现',
            icon: 'icon-tixian2'
        }
    ],
    // 个人中心底部导航栏
    centerlistData: [{
            path: '/traderecord',
            icon: 'iconfont icon-wj-zcjl iconColor2',
            title: '交易记录'
        },
        {
            path: '/todayprofitloss',
            icon: 'iconfont icon-baobiao iconColor3',
            title: '今日盈亏'
        },
        {
            path: '/share',
            icon: 'iconfont icon-fenxiangcopy iconColor4',
            title: '我要分享'
        },
        {
            path: '/about',
            icon: 'iconfont icon-qunzu iconColor5',
            title: '关于我们'
        }
    ],
    centerlisttwoData: [{
        path: '/setting',
        icon: 'iconfont icon-shezhi iconColor3',
        title: '设置'
    }],
    //聊天室消息类型
    messageType: ['text', 'red_bag', 'image'],
    //表情包
    emoji: [{ "code": "🚀" }, { "code": "🚤" }, { "code": "🚕" }, { "code": "🚚" }, { "code": "🚒" }, { "code": "🚑" }, { "code": "🚓" }, { "code": "⛽" }, { "code": "🅿" }, { "code": "🚥" }, { "code": "🚧" }, { "code": "🚨" }, { "code": "♨" }, { "code": "⛺" }, { "code": "🎠" }, { "code": "🎡" }, { "code": "🎢" }, { "code": "🎣" }, { "code": "🎤" }, { "code": "🎥" }, { "code": "🎦" }, { "code": "🎧" }, { "code": "🎨" }, { "code": "🎩" }, { "code": "🎪" }, { "code": "🎫" }, { "code": "🎬" }, { "code": "🎭" }, { "code": "🎮" }, { "code": "🀄" }, { "code": "🎯" }, { "code": "🎰" }, { "code": "🎱" }, { "code": "🎲" }, { "code": "🎳" }, { "code": "🎴" }, { "code": "🃏" }, { "code": "🎵" }, { "code": "🎶" }, { "code": "🎷" }, { "code": "🎸" }, { "code": "🎹" }, { "code": "🎺" }, { "code": "🎻" }, { "code": "🎼" }, { "code": "〽" }, { "code": "📷" }, { "code": "📹" }, { "code": "📺" }, { "code": "📻" }, { "code": "📼" }, { "code": "💋" }, { "code": "💌" }, { "code": "💍" }, { "code": "💎" }, { "code": "💏" }, { "code": "💐" }, { "code": "💑" }, { "code": "💒" }, { "code": "🔞" }, { "code": "©" }, { "code": "®" }, { "code": "™" }, { "code": "ℹ" }, { "code": "🔟" }, { "code": "📶" }, { "code": "📳" }, { "code": "📴" }, { "code": "🍔" }, { "code": "🍙" }, { "code": "🍰" }, { "code": "🍜" }, { "code": "🍞" }, { "code": "🍳" }, { "code": "🍦" }, { "code": "🍟" }, { "code": "🍡" }, { "code": "🍘" }, { "code": "🍚" }, { "code": "🍝" }, { "code": "🍛" }, { "code": "🍢" }, { "code": "🍣" }, { "code": "🍱" }, { "code": "🍲" }, { "code": "🍧" }, { "code": "🍖" }, { "code": "🍥" }, { "code": "🍠" }, { "code": "🍕" }, { "code": "🍗" }, { "code": "🍨" }, { "code": "🍩" }, { "code": "🍪" }, { "code": "🍫" }, { "code": "🍬" }, { "code": "🍭" }, { "code": "🍮" }, { "code": "🍯" }, { "code": "🍤" }, { "code": "🍴" }, { "code": "☕" }, { "code": "🍸" }, { "code": "🍺" }, { "code": "🍵" }, { "code": "🍶" }, { "code": "🍷" }, { "code": "🍻" }, { "code": "🍹" }, { "code": "↗" }, { "code": "↘" }, { "code": "↖" }, { "code": "↙" }, { "code": "⤴" }, { "code": "⤵" }, { "code": "↔" }, { "code": "↕" }, { "code": "⬆" }, { "code": "⬇" }, { "code": "➡" }, { "code": "⬅" }, { "code": "▶" }, { "code": "◀" }, { "code": "⏩" }, { "code": "⏪" }, { "code": "⏫" }, { "code": "⏬" }, { "code": "🔺" }, { "code": "🔻" }, { "code": "🔼" }, { "code": "🔽" }, { "code": "⭕" }, { "code": "❌" }, { "code": "❎" }, { "code": "❗" }, { "code": "⁉" }, { "code": "‼" }, { "code": "❓" }, { "code": "❔" }, { "code": "❕" }, { "code": "〰" }, { "code": "➰" }, { "code": "❤" }, { "code": "💓" }, { "code": "💔" }, { "code": "💕" }, { "code": "💖" }, { "code": "💗" }, { "code": "💘" }, { "code": "💙" }, { "code": "💚" }, { "code": "💛" }, { "code": "💜" }, { "code": "💝" }, { "code": "💞" }, { "code": "💟" }, { "code": "♥" }, { "code": "♠" }, { "code": "♦" }, { "code": "♣" }, { "code": "🚬" }, { "code": "🚭" }, { "code": "♿" }, { "code": "🚩" }, { "code": "⚠" }, { "code": "⛔" }, { "code": "♻" }, { "code": "🚲" }, { "code": "🚶" }, { "code": "🚹" }, { "code": "🚺" }, { "code": "🛀" }, { "code": "🚻" }, { "code": "🚽" }, { "code": "🚾" }, { "code": "🚼" }, { "code": "🚪" }, { "code": "🚫" }, { "code": "✔" }, { "code": "🆑" }, { "code": "🆒" }, { "code": "🆓" }, { "code": "🆔" }, { "code": "🆕" }, { "code": "🆖" }, { "code": "🆗" }, { "code": "🆘" }, { "code": "🆙" }, { "code": "🆚" }, { "code": "🈁" }, { "code": "🈂" }, { "code": "🈲" }, { "code": "🈳" }, { "code": "🈴" }, { "code": "🈵" }, { "code": "🈶" }, { "code": "🈚" }, { "code": "🈷" }, { "code": "🈸" }, { "code": "🈹" }, { "code": "🈯" }, { "code": "🈺" }, { "code": "㊙" }, { "code": "㊗" }, { "code": "🉐" }, { "code": "🉑" }, { "code": "➕" }, { "code": "➖" }, { "code": "✖" }, { "code": "➗" }, { "code": "💠" }, { "code": "💡" }, { "code": "💢" }, { "code": "💣" }, { "code": "💤" }, { "code": "💥" }, { "code": "💦" }, { "code": "💧" }, { "code": "💨" }, { "code": "💩" }, { "code": "💪" }, { "code": "💫" }, { "code": "💬" }, { "code": "✨" }, { "code": "✴" }, { "code": "✳" }, { "code": "⚪" }, { "code": "⚫" }, { "code": "🔴" }, { "code": "🔵" }, { "code": "🔲" }, { "code": "🔳" }, { "code": "⭐" }, { "code": "⬜" }, { "code": "⬛" }, { "code": "▫" }, { "code": "▪" }, { "code": "◽" }, { "code": "◾" }, { "code": "◻" }, { "code": "◼" }, { "code": "🔶" }, { "code": "🔷" }, { "code": "🔸" }, { "code": "🔹" }, { "code": "❇" }, { "code": "💮" }, { "code": "💯" }, { "code": "↩" }, { "code": "↪" }, { "code": "🔃" }, { "code": "🔊" }, { "code": "🔋" }, { "code": "🔌" }, { "code": "🔍" }, { "code": "🔎" }, { "code": "🔒" }, { "code": "🔓" }, { "code": "🔏" }, { "code": "🔐" }, { "code": "🔑" }, { "code": "🔔" }, { "code": "☑" }, { "code": "🔘" }, { "code": "🔖" }, { "code": "🔗" }, { "code": "🔙" }, { "code": "🔚" }, { "code": "🔛" }, { "code": "🔜" }, { "code": "🔝" }, { "code": "✅" }, { "code": "✊" }, { "code": "✋" }, { "code": "✌" }, { "code": "👊" }, { "code": "👍" }, { "code": "☝" }, { "code": "👆" }, { "code": "👇" }, { "code": "👈" }, { "code": "👉" }, { "code": "👋" }, { "code": "👏" }, { "code": "👌" }, { "code": "👎" }, { "code": "👐" }]
}

function getQueryString(name) { //根据字段看网址是否拼接&字符串
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
var from = getQueryString('from');
var appinstall = getQueryString('appinstall');
var sec = getQueryString('sec');
var timekey = getQueryString('timekey');
if (from || appinstall || sec || timekey) { //假如拼接上了
    window.location.href = 'http://www.ke49k.cn'
}