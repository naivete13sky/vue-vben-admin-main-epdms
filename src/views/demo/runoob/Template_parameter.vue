<template>
  <div id="app">
    <p><a v-bind:href="url">菜鸟教程</a></p>
  </div>


</template>


<script>
  export default {
    data() {
      return {
        url: 'https://www.runoob.com'
      }
    }
  }

</script>


<!--在这里 href 是参数，告知 v-bind 指令将该元素的 href 属性与表达式 url 的值绑定。-->

<!--另一个例子是 v-on 指令，它用于监听 DOM 事件：-->

<!--&lt;!&ndash; 完整语法 &ndash;&gt;-->
<!--<a v-on:click="doSomething"> ... </a>-->

<!--&lt;!&ndash; 缩写 &ndash;&gt;-->
<!--<a @click="doSomething"> ... </a>-->

<!--&lt;!&ndash; 动态参数的缩写 (2.6.0+) &ndash;&gt;-->
<!--<a @[event]="doSomething"> ... </a>-->

<!--在这里参数是监听的事件名。-->

<!--修饰符-->
<!--修饰符是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：-->

<!--<form v-on:submit.prevent="onSubmit"></form>-->



<!--缩写-->
<!--v-bind 缩写-->
<!--Vue.js 为两个最为常用的指令提供了特别的缩写：-->

<!--&lt;!&ndash; 完整语法 &ndash;&gt;-->
<!--<a v-bind:href="url"></a>-->
<!--&lt;!&ndash; 缩写 &ndash;&gt;-->
<!--<a :href="url"></a>-->
<!--v-on 缩写-->
<!--&lt;!&ndash; 完整语法 &ndash;&gt;-->
<!--<a v-on:click="doSomething"></a>-->
<!--&lt;!&ndash; 缩写 &ndash;&gt;-->
<!--<a @click="doSomething"></a>-->
