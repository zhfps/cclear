<script lang="ts" setup>
  import { NConfigProvider, lightTheme } from 'naive-ui'
  import Layout from './layout/Layout.vue'
</script>

<template>
  <div class="c-container">
    <n-config-provider :theme="lightTheme">
      <Layout />
    </n-config-provider>
  </div>
</template>
