<template>
  <div id="app" class="demo">
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
