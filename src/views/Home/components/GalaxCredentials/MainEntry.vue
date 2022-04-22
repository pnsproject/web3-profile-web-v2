<template>
  <div id="GalaxyCredentials">
    <div class="title">
      <div class="left">
        <span class="text">Galaxy Credentials</span>
        <span class="count"> {{ props.galaxyCredentialsList.length }}</span>
      </div>
      <div class="right">
        <EditBtn class="edit" />
      </div>
    </div>
    <div class="content">
      <div class="nft-item"
           v-for="item in props.galaxyCredentialsList"
           :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditBtn from '@/components/EditBtn/MainEntry.vue'
import { computed, ref } from 'vue'

const props = defineProps<{galaxyCredentialsList: Global.GalaxyCredentials[]}>()

const contentHeight = computed(() => {
  return Math.ceil(props.galaxyCredentialsList.length / 5) * 73 + 'px'
})
</script>

<style lang="less" scoped>
#GalaxyCredentials {
  margin-top: 30px;
  user-select: none;
  box-sizing: border-box;

  .title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    .left, .right{
      display: flex;
      align-items: center;
    }

    .text {
      font-weight: 600;
      font-size: 16px;
      line-height: 100%;
      color: #010008;
    }

    .count {
      line-height: 16px;
      padding: 0 8px;
      font-weight: 400;
      font-size: 12px;
      text-align: center;
      color: #5A596E;
      background: #F9F8FC;
      margin-left: 6px;
      border-radius: 4px;
    }

    .edit {
      margin-left: 25px;
    }
  }

  .nft-item {
    height: 36px;
    line-height: 36px;
    background: #F9F9FC;
    font-weight: 400;
    font-size: 14px;
    color: #89899A;
    padding: 0 10px;
    border-radius: 4px;
    margin-right: 10px;
    margin-top: 14px;
  }

  .content {
    overflow: hidden;
    transition: height 0.3s;
    display: flex;
    flex-flow: row nowrap;
    align-content: baseline;
  }
}

@media only screen and (max-width: 954px) {
  #GalaxyCredentials {
    width: 100vw;
    max-width: 388px;
    padding: 0 25px;

    .app-item:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
