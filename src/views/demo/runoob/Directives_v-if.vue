<template>
  <div id="app" class="demo">
      <p v-if="showMessage">Hello Vue!</p>
      <p v-else>Goodbye Vue!</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showMessage: true
        // showMessage: false
      }
    }
  }

</script>


<!--使用 v-if 和 v-else 指令根据表达式的值来条件性地渲染元素或组件：-->
