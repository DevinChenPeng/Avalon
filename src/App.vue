<template>
    <n-watermark content="Devin 11" cross fullscreen :font-size="16" :line-height="16" :width="384" :height="384" :x-offset="12" :y-offset="50" :rotate="-15" />
    <n-config-provider class="wh100" :theme="darkTheme">
        <n-message-provider>
            <RouterView />
        </n-message-provider>
    </n-config-provider>
</template>
<script setup>
import { RouterView } from 'vue-router';
import { darkTheme } from 'naive-ui';
</script>
<style scoped lang="less"></style>
