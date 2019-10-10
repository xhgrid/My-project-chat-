var websock = null
var number = 0

function initWebSocket() {
    const wsuri = window.Glod.wsuri
    websock = new WebSocket(wsuri)
    websock.onopen = function() {
        websocketOnOpen()
        websocketLogin()
    }
    websock.onmessage = function(e) {
        websocketOnMessage(e)
    }
    websock.onerror = function() {
        websocketOnerror()
    }
    websock.onclose = function(e) {
        websocketClose()
    }
}

function websocketOnOpen() { //连接建立之后执行send方法发送数据
    // console.log('连接聊天室成功')
}

function websocketOnerror() { //连接建立失败重连
    // console.log('连接聊天室失败')
}

function websocketOnMessage(e) { //接受数据
    //调聊天室房间或者首页消息展示数据的方法
    // console.log(e)
}

function websocketSend(agentData) { //数据发送
    websock.send(JSON.stringify(agentData));
}

function websocketClose() { //关闭
    var time = setTimeout(function() {
        initWebSocket();
        number++
    }, 3000);
    if (number == window.Glod.websockNumber) {
        clearTimeout(time)
    }
}

// 发送方法
function sendSock(agentData) {
    if (websock.readyState === websock.OPEN) {
        //若是ws开启状态
        websocketSend(agentData)
    } else if (websock.readyState === websock.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function() {
            sendSock(agentData);
        }, 1000);
    } else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function() {
            initWebSocket();
            // console.log('正在重连')
        }, 1000);
    }
}
// 登录方法
function websocketLogin() {
    var Token = localStorage.getItem('Authorization')
    var sendData = {
        token: Token,
        message_type: 'login'
    }
    sendSock(sendData)
        // console.log('登录成功')
}

setInterval(() => {
    sendSock('1')
}, window.Glod.sendTime);

initWebSocket()

export {
    websock,
    sendSock,
    initWebSocket
}