<template>
  <div id="app">
    <immocHeader></immocHeader>
    <router-view></router-view>
    <immocFooter></immocFooter>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    'immocHeader': Header,
    'immocFooter': Footer
  }
}
</script>

<style lang="scss">
@import "assets/css/full.css";
@import "assets/css/global.css";
@import "assets/css/layui-layer/layer.css";
</style>
