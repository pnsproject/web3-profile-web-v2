<template>
  <a :href="props.mediaItem.value" class="media-item" target="_blank">
    <img :src="props.mediaItem.icon" :alt="props.mediaItem.name" class="icon">
    <span class="account" :style="{color : props.mediaItem.color}">{{ text }}</span>
    <span class="suffix">{{ props.mediaItem.suffix }}</span>
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  mediaItem: Global.MediaItem
}
const props = defineProps<Props>()

const text = computed(() => {
  if (['com.github', 'com.twitter'].includes(props.mediaItem.recordKey)) {
    return props.mediaItem.value?.split('/').pop()
  }
  return props.mediaItem.value
})

</script>

<style lang="less" scoped>
  .media-item {
    display: inline-flex;
    height: 34px;
    line-height: 34px;
    border: 1px solid #EEEEEE;
    box-sizing: border-box;
    border-radius: 34px;
    padding: 0 20px;
    box-shadow: 0 5.25384px 4.50329px rgba(32, 41, 53, 0.03);
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
    gap: 8px;

    .icon {
      min-height: 12px;
      height: 12px;
    }

    .account {
      font-size: 12px;
      font-weight: 600;
    }

    .suffix {
      font-size: 12px;
      color: #D2D2D2;
    }
  }
</style>
