<template>
  <div id="app" class="demo">
      <img v-bind:src="imageSrc">
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imageSrc: 'https://static.runoob.com/images/code-icon-script.png'
      }
    }
  }


</script>

<!--使用 v-bind 指令将 Vue 实例的数据绑定到 HTML 元素的属性上：-->
