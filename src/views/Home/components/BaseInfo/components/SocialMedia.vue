<template>
  <a class="social-media"
     :href="props.type === 'email'? `mailto:${props.url}` : props.url">
    <img class="normal" :src="icon[1]" :alt="props.type">
    <img class="active" :src="icon[0]" :alt="props.type">
  </a>
</template>

<script lang="ts" setup>
import icons, { IconsType } from './setting/social_media_icons'
import { computed } from 'vue'
const props = defineProps<{type: string, url: string}>()

const icon = computed(() => {
  return icons[props.type]
})
</script>

<style lang="less" scoped>
  .social-media {
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 32px;
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
