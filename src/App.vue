<template>
  <div id="app">
    <!-- <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider> -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>


<style scoped></style>
