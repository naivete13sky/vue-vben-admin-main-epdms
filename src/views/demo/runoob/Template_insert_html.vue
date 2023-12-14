<template>
  <div id="example1" class="demo">
    <p>使用双大括号的文本插值: {{ rawHtml }}</p>
    <p>使用 v-html 指令: <span v-html="rawHtml"></span></p>
  </div>
</template>


<script>
  export default {
      data() {
      return {
        rawHtml: '<span style="color: red">这里会显示红色！</span>'
      }
    }
  }

</script>


<!--使用 v-html 指令用于输出 html 代码：-->
