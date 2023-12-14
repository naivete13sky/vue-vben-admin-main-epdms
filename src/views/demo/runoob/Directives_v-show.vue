<template>
  <div id="hello-vue" class="demo">
      <button v-on:click="showMessage = !showMessage">显示/隐藏</button>
      <p v-show="showMessage">Hello Vue!</p>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        showMessage: true
      }
    }
  }

</script>
