<template>
  <div id="hello-vue" class="demo">
    {{ message }}
  </div>
</template>


<script>
  export default {
    data() {
      return {
        message: 'Hello Vue!!'
      }
    }
  }

</script>


<!--{{...}} 标签的内容将会被替代为对应组件实例中 message 属性的值，如果 message 属性的值发生了改变，{{...}} 标签内容也会更新。-->
<!--如果不想改变标签的内容，可以通过使用 v-once 指令执行一次性地插值，当数据改变时，插值处的内容不会更新。-->
<!--<span v-once>这个将不会改变: {{ message }}</span>-->
