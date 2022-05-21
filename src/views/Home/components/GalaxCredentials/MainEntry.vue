<template>
  <div id="GalaxyCredentials" v-if="props.galaxyCredentialsList.length">
    <div class="title">
      <div class="left">
        <span class="text">Galaxy Credentials</span>
        <span class="count"> {{ props.galaxyCredentialsList.length }}</span>
      </div>
      <div class="right">
        <EditBtn v-if="account.editable" @click="showWindow('EditGalaxyCredentials', {title:'My App', data: galaxyCredentialsList})" class="edit" />
      </div>
    </div>
    <div class="content">
      <Swiper :item-space="10"
              v-slot="item:SwiperSlotData"
              :datalist="props.galaxyCredentialsList"
              :page-size="100">
        <div class="nft-item">
          {{ item.data.name }}
        </div>
      </Swiper>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditBtn from '@/components/EditBtn/MainEntry.vue'
import Swiper from '@/components/SwiperSmall/MainEntry.vue'
import { account } from '@/state/account'
import { showWindow } from '@/state/editWindows'

type SwiperSlotData = any

const props = defineProps<{galaxyCredentialsList: Global.GalaxyCredentials[]}>()
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
  }
}
</style>
