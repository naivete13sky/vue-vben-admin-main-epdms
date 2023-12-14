<template>
  <div id="app" class="demo">
    FunctionData
    <br>
    <p>{{ count }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 4
    };
  },
  mounted() {
    console.log(this.$data.count); // => 4
    console.log(this.count);       // => 4
    this.count = 5;
    console.log(this.$data.count); // => 5
    this.$data.count = 6;
    console.log(this.count); // => 6
  }
};
</script>




<style scoped>
/* Add your styles here */
</style>

<!--data 选项是一个函数。Vue 在创建新组件实例的过程中调用此函数。
它应该返回一个对象，然后 Vue 会通过响应性系统将其包裹起来，并以 $data 的形式存储在组件实例中。-->
