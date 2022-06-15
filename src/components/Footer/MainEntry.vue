<template>
  <footer class="page-footer">
    <a :href="config.pnsUrl" target="_blank"><span>Built by</span><img src="/pns_logo.svg"></a>
  </footer>
</template>

<script lang="ts" setup>
import config from '@/state/config'
</script>

<style lang="less" scoped>
  .page-footer {
    margin-top: 60px;
    margin-bottom: 43px;
    display: flex;
    justify-content: center;

    a{
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: #010008;

      img {
        margin-left: 8px;
        height: 32px;
        width: 88px;
      }
    }
  }
</style>
