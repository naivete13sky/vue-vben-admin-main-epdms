<template>
  <div id="app" class="demo">
      <input type="text" v-model="message">
      <p>{{ message }}</p>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }


</script>

<style scoped>
.demo {
  text-align: center;
  margin-top: 50px;
}
</style>


<!--v-model	用于在表单控件和 Vue 实例的数据之间创建双向数据绑定。-->
