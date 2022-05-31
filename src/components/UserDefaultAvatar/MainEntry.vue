<template>
  <div class="default-avatar">
    <img class="bg" :src="bg" alt="default-avatar">
    <div class="domain"> {{ domain.replace('.dot', '') }}<span>.dot</span></div>
  </div>
</template>

<script lang="ts" setup>
import bg from './assets/defuault_avatar.svg'
import { computed } from 'vue'

const props = withDefaults(defineProps<{domain: string}>(), { domain: 'zfdsdfsdfsdf.dot' })

const fontSize = computed(() => {
  const width = document.body.clientWidth < 388 ? document.body.clientWidth : 388
  return Math.ceil(width * 0.08) + 'px'
})
</script>

<style lang="less">
  .default-avatar {
    max-width: 388px;
    max-height: 388px;
    width: 100vw;
    height: 100vw;
    position: relative;

    .bg {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    .domain {
      z-index: 2;
      font-weight: bold;
      font-size: v-bind("fontSize");
      width: 80%;
      height: auto;
      word-break: break-all;
      position: absolute;
      top:45%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      span {
        white-space: nowrap;
      }
    }
  }
</style>
