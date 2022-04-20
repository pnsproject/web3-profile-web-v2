<template>
  <div class="social-media" @click="goto">
    <div class="normal">normal</div>
    <div class="active">active</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{type: string, url: string}>()

const goto = () => {
  if (!props.url) return
  window.open(props.url, '_blank')
}
</script>

<style lang="less" scoped>
  .social-media {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    position: relative;

    .normal, .active {
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%, -50%);
    }

    .active {
      display: none;
    }

    &:hover {
      .active {
        display: block;
      }
      .normal {
        display: none;
      }
    }

    &:active {
      .active {
        display: block;
      }
      .normal {
        display: none;
      }
    }
  }
</style>
