<script lang="ts" setup>
  import { NButton, NCard, NConfigProvider, NSpace, lightTheme } from 'naive-ui'
</script>

<template>
  <div class="c-container">
    <n-config-provider :theme="lightTheme">
      <n-card>
        <n-space>
          <n-button type="primary">
            浅色
          </n-button>
        </n-space>
      </n-card>
    </n-config-provider>
  </div>
</template>
