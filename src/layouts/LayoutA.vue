<template>
  <Header />
  <div class="layout-a" :class="{'mobile': isMobile}">
    <slot />
  </div>
  <Footer></Footer>
</template>

<script lang="ts" setup>
import Header from '@/components/Header/MainEntry.vue'
import Footer from '@/components/Footer/MainEntry.vue'
import { drive } from '../state/mobileCheck'
import { computed } from 'vue'

const isMobile = computed(() => {
  return drive.isMobile
})
</script>

<style lang="less" scoped>
  .layout-a {
    width: 100%;
    overflow: hidden;
    margin-top: 60px;
    margin-bottom: 46px;

    &.mobile {
      margin-top: 0;
    }
  }
</style>
