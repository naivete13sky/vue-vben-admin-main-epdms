<template>
  <div id="hello-vue" class="demo">
    {{ message }}
  </div>

  <div id="hello-vue2" class="demo">
    {{ message2 }}
  </div>
</template>

<script lang="ts">
  import { defineComponent, createApp } from 'vue';

  export default defineComponent({
    data() {
      return {
        message: 'Hello Vue!!',
        message2: 'Message from HelloVueApp'
      };
    },
    mounted() {
      // 在主组件的 mounted 生命周期钩子中创建并挂载独立的 Vue 实例
      const helloVueAppInstance = createApp({
        data() {
          return {
            message2: 'Hello Vue!!2'
          };
        },
        template: '<div>{{ message2 }}</div>'
      });

      // 将实例挂载到指定的元素
      helloVueAppInstance.mount('#hello-vue2');
    }
  });
</script>
