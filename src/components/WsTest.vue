<template>
  <div class="ws">
    <el-row>
      <el-col :span="12">
        <div class="safeBox">
          <el-card class="box-card">
            <div v-for="msg in messageListA" :key="msg" class="text item">
              {{'列表内容 ' + msg }}
            </div>
          </el-card>
          <el-input
            placeholder="请输入内容"
            v-model="inputA"
            clearable>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'WsTest',
  data () {
    return {
      inputA: '',
      inputB: '',
      messageListA: ['1', '2'],
      messageListB: []
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
  }
</style>
