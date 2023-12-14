<template>
  <div id="app" class="demo">
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        items: [
          { id: 1, text: 'Item 1' },
          { id: 2, text: 'Item 2' },
          { id: 3, text: 'Item 3' }
        ]
      }
    }
  }


</script>


<!--使用 v-for 指令根据数组的属性值循环渲染元素或组件：-->
