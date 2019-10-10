/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import wx from 'weixin-js-sdk'
import Axios from 'axios'
const wxApi = {
    /**
     * [wxRegister 微信Api初始化]
     * @param  {Function} callback [ready回调函数]
     */
    wxRegister(callback) {
        // 这边的接口请换成你们自己的
        // Axios.post('http://45.125.14.105/index.php', { reqUrl: window.location.href }, { timeout: 5000, withCredentials: true }).then((res) => {
        //     let data = JSON.parse(res.data.data) // PS: 这里根据你接口的返回值来使用
        //     wx.config({
        //         debug: false, // 开启调试模式
        //         appId: data.appId, // 必填，公众号的唯一标识
        //         timestamp: data.timestamp, // 必填，生成签名的时间戳
        //         nonceStr: data.noncestr, // 必填，生成签名的随机串
        //         signature: data.signature, // 必填，签名，见附录1
        //         jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        //     })
        // }).catch((error) => {
        //     console.log(error)
        // })
        wx.config({
            debug: true, // 开启调试模式
            appId: 'wxd4895e4a6a4e1065', // 必填，公众号的唯一标识
            timestamp: 1568969369, // 必填，生成签名的时间戳
            nonceStr: 'zlftqg', // 必填，生成签名的随机串
            signature: '8f3320f4d0f4c2426b10de2592ae530f7dbe4676', // 必填，签名，见附录1
            jsApiList: [
                    'updateAppMessageShareData', 'updateTimelineShareData'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready((res) => {
            // 如果需要定制ready回调方法
            if (callback) {
                callback()
            }
        })
        wx.error((res) => {
            // alert(res.errMsg)
            // console.log('错误')
        })
    },
    /**
     * [ShareTimeline 微信分享到朋友圈]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    ShareTimeline(option) {
        wx.onMenuShareTimeline({
            title: option.title, // 分享标题
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success() {
                // 用户成功分享后执行的回调函数
                option.success()
            },
            cancel() {
                // 用户取消分享后执行的回调函数
                option.error()
            }
        })
    },
    /**
     * [ShareAppMessage 微信分享给朋友]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    ShareAppMessage(option) {
        wx.onMenuShareAppMessage({
            title: option.title, // 分享标题
            desc: option.desc, // 分享描述
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success() {
                // 用户成功分享后执行的回调函数
                option.success()
            },
            cancel() {
                // 用户取消分享后执行的回调函数
                option.error()
            }
        })
    }
}
export default wxApi

// const jsApiList = [
//     'checkJsApi',
//     'onMenuShareTimeline',
//     'onMenuShareAppMessage',
//     'hideOptionMenu',
//     'showOptionMenu',
//     'shareTimeline' //不存在
// ];

// function getJSSDK(url, dataForWeixin) {
//     // 调用后台接口换取参数
//     Axios.get('https://zbhxfapi.1m2.net/weixin/share', {
//         params: {
//             url,
//         },
//     }).then((res) => {
//         wx.config({
//             debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//             appId: res.data.object.appId, // 必填，公众号的唯一标识
//             timestamp: res.data.object.timestamp, // 必填，生成签名的时间戳
//             nonceStr: res.data.object.nonceStr, // 必填，生成签名的随机串
//             signature: res.data.object.signature, // 必填，签名
//             jsApiList, // 必填，需要使用的JS接口列表
//         });
//         wx.ready(() => {
//             wx.onMenuShareAppMessage({
//                 title: dataForWeixin.title,
//                 desc: dataForWeixin.desc,
//                 link: dataForWeixin.linkurl,
//                 imgUrl: dataForWeixin.img,
//                 trigger: function trigger(res) {},
//                 success: function success(res) {
//                     console.log('已分享');
//                 },
//                 cancel: function cancel(res) {
//                     console.log('已取消');
//                 },
//                 fail: function fail(res) {
//                     console.log(JSON.stringify(res), 123456);
//                 },
//             });
//             // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
//             wx.onMenuShareTimeline({
//                 title: dataForWeixin.title,
//                 link: dataForWeixin.linkurl,
//                 imgUrl: dataForWeixin.img,
//                 trigger: function trigger(res) {
//                     // alert('用户点击分享到朋友圈');
//                 },
//                 success: function success(res) {
//                     // alert('已分享');
//                 },
//                 cancel: function cancel(res) {
//                     // alert('已取消');
//                 },
//                 fail: function fail(res) {
//                     alert(JSON.stringify(res));
//                 },
//             });
//             // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
//             wx.onMenuShareQQ({
//                 title: dataForWeixin.title,
//                 desc: dataForWeixin.desc,
//                 link: dataForWeixin.linkurl,
//                 imgUrl: dataForWeixin.img,
//                 trigger: function trigger(res) {
//                     // alert('用户点击分享到QQ');
//                 },
//                 complete: function complete(res) {
//                     alert(JSON.stringify(res));
//                 },
//                 success: function success(res) {
//                     // alert('已分享');
//                 },
//                 cancel: function cancel(res) {
//                     // alert('已取消');
//                 },
//                 fail: function fail(res) {
//                     // alert(JSON.stringify(res));
//                 },
//             });
//             // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
//             wx.onMenuShareWeibo({
//                 title: dataForWeixin.title,
//                 desc: dataForWeixin.desc,
//                 link: dataForWeixin.linkurl,
//                 imgUrl: dataForWeixin.img,
//                 trigger: function trigger(res) {
//                     // alert('用户点击分享到微博');
//                 },
//                 complete: function complete(res) {
//                     // alert(JSON.stringify(res));
//                 },
//                 success: function success(res) {
//                     // alert('已分享');
//                 },
//                 cancel: function cancel(res) {
//                     // alert('已取消');
//                 },
//                 fail: function fail(res) {
//                     // alert(JSON.stringify(res));
//                     console.log(JSON.stringify(res));
//                 },
//             });
//         });
//         wx.error((res) => {
//             console.log(`${JSON.stringify(res)}微信验证失败`, 456);
//             // alert(JSON.stringify(res)+"微信验证失败");
//         });
//     });
// }
// export default {
//     // 获取JSSDK
//     getJSSDK,
// };