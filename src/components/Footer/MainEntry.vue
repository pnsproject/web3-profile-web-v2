<template>
  <footer class="page-footer">
    <a href="https://www.pns.link" target="_blank"><span>Built by</span><img src="/pns_logo.svg"></a>
  </footer>
</template>

<script lang="ts" setup>

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
      font-size: 14px;

      img {
        margin-left: 6px;
        height: 18px;
      }
    }
  }
</style>
