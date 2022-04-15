<template>
  <div class="thumbnail-error">
    <div class="tit">Error</div>
    <div class="des">Sorry,we couldn’t display this <br> NFT at that time</div>
    <div class="reload-btn" @click.stop="reload">Try again</div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['reload'])

const reload = () => {
  emit('reload')
}
</script>

<style lang="less" scoped>
.thumbnail-error {
  text-align: center;
  min-height: 117px!important;
  .tit {
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    color: #000000;
  }
  .des {
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #5A596E;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .reload-btn {
    width: 113px;
    height: 31px;
    border-radius: 32px;
    background: #E5458D;
    box-shadow: 0 1px 0 rgba(229, 69, 141, 0.24);
    margin: 0 auto;
    text-align: center;
    line-height: 31px;
    box-sizing: border-box;
    color:#fff;
    font-weight: bold;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: #F2739B;
    }

    &:active {
      background: #C51351;
    }
  }
}
</style>
