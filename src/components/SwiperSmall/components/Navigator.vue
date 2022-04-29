<template>
  <div class="navigator" :class="props.position">
    <img :src="arrow">
  </div>
</template>

<script lang="ts" setup>
import arrow from '../assets/arrow_right.svg'
const props = withDefaults(defineProps<{position: string}>(), { position: 'left' })
</script>

<style lang="less" scoped>
  .navigator {
    position: absolute;
    width: 40px;
    height: 40px;
    right: 0;
    margin-right: -16px;
    top: 50%;
    margin-top: -20px;
    border: 1px solid #D6D6DE;
    border-radius: 50%;
    cursor: pointer;
    background: #fff;
    z-index: 3;
    user-select: none;
    transition: all 0.2s;

    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &.left {
      left: 0;
      right: inherit;
      margin-left: -16px;
      margin-right: 0;

      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(180deg);
      }
    }

    &:hover {
      border-color: #b9b9bf;
    }

    &:active {
      transform: scale(0.9);
    }
  }
</style>
