<template>
  <a class="share-media" href="#">
    <img class="normal" :src="icon[0]" :alt="props.type">
    <img class="active" :src="icon[1]" :alt="props.type">
    <span>{{ icon[2] }}</span>
  </a>
</template>

<script lang="ts" setup>
import icons, { IconsType } from './setting/share_media_icons'
import { computed } from 'vue'
const props = defineProps<{type: IconsType}>()

const icon = computed(() => {
  return icons[props.type]
})
</script>

<style lang="less" scoped>
  .share-media {
    cursor: pointer;
    width: 62px;
    height: 62px;
    border-radius: 32px;
    position: relative;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #5A596E;

    .normal, .active {
      width: 50px;
      height: 50px;
      display: block;
      margin: 0 auto 10px auto;
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
