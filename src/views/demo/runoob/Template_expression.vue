<template>
  <div id="app">
    {{5+5}}<br>
    {{ ok ? 'YES' : 'NO' }}<br>
    {{ message.split('').reverse().join('') }}
    <div v-bind:id="'list-' + id">菜鸟教程</div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        ok: true,
        message: 'RUNOOB!!',
        id: 1
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

