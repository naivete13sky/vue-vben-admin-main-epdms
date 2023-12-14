<template>
  <div id="hello-vue" class="demo">
  {{ message }}
</div>
</template>


<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    data() {
      return {
        message: 'Hello Vue!!'
      }
    }
  });
</script>


