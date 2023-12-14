<template>
  <div id="app" class="demo">
    FunctionMethods
    <br>
    <p>{{ count }}</p>
  </div>

</template>

<script>
  export default {
    data() {
      return { count: 4 }
    },
    methods: {
      increment() {
        // `this` 指向该组件实例
        this.count++
      }
    },
    mounted() {
      console.log(this.$data.count); // => 4
      console.log(this.count);       // => 4
      this.increment()
      console.log(this.$data.count); // => 5
      console.log(this.count); // => 5
      this.$data.count = 6;
      console.log(this.count); // => 6
    }
  };

</script>
