<template>
  <PageLoading v-if="loading"></PageLoading>
  <LayoutA v-else>
    <div class="main-contain" :class="{mobile: isMobile}">
      <div class="contain-row">
        <div class="avatar">123123123</div>
        <div class="contains">12312312312</div>
      </div>
    </div>
  </LayoutA>
</template>

<script lang="ts" setup>
import LayoutA from '@/layouts/LayoutA.vue'
import PageLoading from '@/components/PageLoading/MainEntry.vue'
import appConfig, { PnsChainId } from '@/state/config'
import { computed, reactive, ref } from 'vue'
import { drive } from '@/state/mobileCheck'

const loading = false

const isMobile = computed(() => {
  return drive.isMobile
})
</script>

<style lang="less" scoped>
  .main-contain {
    min-height: 100vh;
    width: 100%;

    .contain-row {
      width: 954px;
      display: flex;
      flex-flow: row nowrap;
      margin: 0 auto;
    }

    .avatar {
      width: 388px;
      margin-right: 43px;
      height: 100px;
      background: #f1f1f1;
    }

    .contains {
      width: 526px;
      height: 100px;
      background: #f1f1f1;
    }

    &.mobile {
      .contain-row {
        width: 100%;
        max-width: 388px;
        display: flex;
        flex-flow: column wrap;

        .avatar {
          width: 100%;
        }

        .contains {
          width: 100%;
        }
      }
    }
  }
</style>
