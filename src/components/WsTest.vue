<template>
  <div class="ws">
    <div class="safeBox">
      <el-card class="box-card">
        <div v-for="msg in messageList" :key="msg" class="text item">
          {{'消息 ' + msg }}
        </div>
      </el-card>
      <el-input
        placeholder="请输入内容"
        v-model="msg"
        clearable>
        <el-button type="success" slot="append" @click="sendMsg()">发送</el-button>
      </el-input>
    </div>
    <el-input
      placeholder="请输入id"
      v-model="client"
      clearable>
      <el-button type="success" slot="append" @click="wsInit()">上线</el-button>
    </el-input>
    <el-input
      placeholder="请输入目标id"
      v-model="target"
      clearable>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'WsTest',
  data () {
    return {
      socket: null,
      msg: '',
      client: '',
      target: '',
      messageList: []
    }
  },
  methods: {
    sendMsg () {
      const param = {
        client: this.client,
        target: this.target,
        msg: this.msg,
        type: 'sendMsg'
      }
      this.socket.send(JSON.stringify(param))
    },
    wsInit () {
      let socketUrl = 'ws://localhost:9999/wsMessage/' + this.client
      if (this.socket != null) {
        this.socket.close()
        this.socket = null
      }
      this.socket = new WebSocket(socketUrl)
      // 打开事件
      this.socket.onopen = () => {
        const param = {
          client: this.client,
          target: 'all',
          msg: this.client + '已上线',
          type: 'online'
        }
        this.socket.send(JSON.stringify(param))
      }
      // 获得消息事件
      this.socket.onmessage = (msg) => {
        if (msg.data != null) {
          const message = JSON.parse(msg.data)
          if (message.type === 'notice') {
            alert(message.msg)
          } else if (message.type === 'msg') {
            this.messageList.push(message.client + ':' + message.msg)
          }
        }
      }
      // 关闭事件
      this.socket.onclose = () => {
        console.log('websocket已关闭')
      }
      // 发生了错误事件
      this.socket.onerror = () => {
        console.log('websocket发生了错误')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .safeBox {
    width: 64%;
    height: 720px;
    border: 1px #ccc solid;
    border-radius: 6px;
    margin: 10px auto;
  }
  .box-card {
    height: calc(100% - 35px);
    overflow: paged-y;
  }
</style>
