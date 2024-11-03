<script setup lang="ts">
import { ref } from 'vue'
import type { MenuOption } from 'naive-ui'
import { NLayout, NLayoutContent, NLayoutSider, NMenu } from 'naive-ui'

const collapsed = ref(false)
const menuOptions: MenuOption[] = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing'
  }
]
</script>

<template>
  <n-layout
    has-sider
    class="c-layout"
  >
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="120"
      :width="220"
      show-trigger="arrow-circle"
      bordered
    >
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
      />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      平山道
    </n-layout-content>
  </n-layout>
</template>

<style scoped>
.c-layout{
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
