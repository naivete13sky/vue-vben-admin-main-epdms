<template>  
  <div id="app">  
    <div id="lightDiv">  
      <div v-show="lightOn"></div>  
      <img src="https://static.runoob.com/images/svg/img_lightBulb.svg">  
    </div>  
    <button v-on:click="toggleLight">开/关</button>  
  </div>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      lightOn: false  
    }  
  },  
  methods: {  
    toggleLight() {  
      this.lightOn = !this.lightOn;  
    }  
  }  
}  
</script>  
  
<style scoped>
#app {
  border: dashed black 1px;
  display: inline-block;
  padding-bottom: 10px;
}

#app > button {
  display: block;
  margin: auto;
}

#lightDiv {
  position: relative;
  width: 150px;
  height: 150px;
}

#lightDiv > img {
  position: relative;
  width: 100%;
  height: 100%;
}

#lightDiv > div {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background-color: yellow;
}
</style>

<!--使用 v-on 指令在 HTML 元素上绑定事件监听器：-->
