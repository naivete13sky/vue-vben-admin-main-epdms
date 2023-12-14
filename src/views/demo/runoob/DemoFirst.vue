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


<!--在这个例子中，通过在主组件的 mounted 生命周期钩子中创建并挂载了一个独立的 Vue 实例（helloVueAppInstance）。
这个实例的模板只包含一个显示 message2 的 div 元素，
然后通过 mount('#hello-vue2') 将这个实例挂载到 #hello-vue2 元素上。-->
