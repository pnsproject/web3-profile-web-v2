<template>
  <div class="address-item" v-if="props.address">
    <div class="icon" :style="{background: props.config.background}">
      <img :src="props.config.icon" :alt="props.config.name">
      <span :style="{color: props.config.color}">{{ props.config.name.toUpperCase() }}</span>
    </div>
    <div class="address">
      <CopyText :text="props.address"></CopyText>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CopyText from '@/components/CopyText/MainEntry.vue'
interface Config {
  name: string,
  color: string,
  background: string
  icon: any
}
const props = defineProps<{
  config:Config,
  address: string
}>()

</script>

<style lang="less" scoped>
  .address-item {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .icon {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 12px;
      font-size: 18px;
      background: #f1f1f1;
      border-radius: 18px;
      margin-right: 14px;

      img {
        display: block;
        margin-right: 8px;
      }
    }

    .address {
      padding: 12px 18px;
      display: block;
      border-radius: 18px;
      color: #5A596E;
      font-size: 18px;
      background: #F3F3F7;
      word-break: break-all;
    }
  }

  @media only screen and (max-width: 550px) {
    .address-item {
      width: 100%;
      flex-flow: column wrap;

      .icon {
        margin-right: 0;
        margin-bottom: 1px;
      }
    }
  }
</style>
