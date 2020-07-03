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
        <el-button type="success" slot="append">发送</el-button>
      </el-input>
    </div>
    <el-input
      placeholder="请输入id"
      v-model="client"
      clearable>
      <el-button type="success" slot="append">上线</el-button>
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
    wsInit (id) {
      let socketUrl = 'http://localhost:9999/demo/imserver/' + id
      socketUrl = socketUrl.replace('https', 'ws').replace('http', 'ws')
      console.log(socketUrl)
      if (this.socket != null) {
        this.socket.close()
        this.socket = null
      }
      this.socket = new WebSocket(socketUrl)
      // 打开事件
      this.socket.onopen = function () {
        console.log('websocket已打开')
        this.socket.send('{"target":"' + id + '", "msg":""}')
      }
      // 获得消息事件
      this.socket.onmessage = function (msg) {
        console.log(msg.data)
        // 发现消息进入    开始处理前端触发逻辑
      }
      // 关闭事件
      this.socket.onclose = function () {
        console.log('websocket已关闭')
      }
      // 发生了错误事件
      this.socket.onerror = function () {
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
