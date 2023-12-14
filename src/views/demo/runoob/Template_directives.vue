<template>
  <div id="app">
    <p v-if="seen">现在你看到我了</p>

    <ol>
      <li v-for="site in sites">
        {{ site.text }}
      </li>
    </ol>
  </div>


</template>


<script>
  export default {
    data() {
      return {
        seen: true,  /* 改为false，信息就无法显示 */
        sites: [
          { text: 'Google' },
          { text: 'Runoob' },
          { text: 'Taobao' }
        ]
      }
    }
  }

</script>

<style scoped>
.class1{
  background: #444;
  color: #eee;
}
</style>

<!--指令是带有 v- 前缀的特殊属性。-->

<!--指令用于在表达式的值改变时，将某些行为应用到 DOM 上。-->

<!--注意<template></template>中只能有一个根<div></div>-->
