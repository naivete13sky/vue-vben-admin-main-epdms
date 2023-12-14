<!--\\有问题，未搞定-->

<template>
  <div id="hello-vue" class="demo">
    createApp
    <br>
    {{ message }}
  </div>
</template>

<script lang="ts">
  import { defineComponent, createApp } from 'vue';

  export default defineComponent({
    data() {
      return {
        message: 'Hello Vue!!1',
      };
    },
    mounted() {
      // 在主组件的 mounted 生命周期钩子中创建并挂载独立的 Vue 实例
      const helloVueAppInstance = createApp({
        data() {
          return {
            message: 'Hello Vue!!2'
          };
        },
        template: '<div>{{ message }}</div>'
      });

      // 将实例挂载到指定的元素
      helloVueAppInstance.mount('#hello-vue');
    }
  });
</script>

