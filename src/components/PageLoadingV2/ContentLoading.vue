<template>
  <div class="content-loading">
    <div class="tit loading-bg"></div>
    <div class="text loading-bg" style="width: 80%"></div>
    <div class="text loading-bg"></div>
    <div class="text loading-bg" style="width: 50%"></div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
  .content-loading {
    margin-bottom: 58px;

    .tit {
      width: 100%;
      height: 38px;
      border-radius: 6px;
      margin-bottom: 20px;
    }

    .text {
      width: 100%;
      height: 14px;
      border-radius: 6px;
      margin-bottom: 12px;
    }
  }

  @media only screen and (max-width: 954px) {
    .content-loading {
      margin: 0 25px 56px 25px
    }
  }
</style>
