<template>
  <div class="content-loading">
    <div class="info">
      <img :src="loadingPic" alt="loading" class="logo">
    </div>
  </div>
</template>

<script lang="ts" setup>
import loadingPic from '../../assets/logo_loading.svg'
</script>

<style lang="less" scoped>
  .content-loading {
    width: 100%;
    height: 100%;
    min-height: 400px;
    position: relative;

    .info {
      left: 50%;
      top: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      font-weight: 600;
      text-align: center;

      .logo {
        width: 100px;
        height: 100px;
        margin-bottom: 1em;
      }
    }
  }
</style>
