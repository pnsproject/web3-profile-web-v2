<template>
  <div id="Collections" v-if="props.collectionsList.length">
    <div class="nft-assets"
         v-for="(collect, index) in props.collectionsList"
         :key="index">
      <div class="title">
        <div class="left">
          <span class="text">{{ collect.name }}</span>
          <span class="count"> {{ collect.nft_assets.length }}</span>
        </div>
        <div class="right">
          <EditBtn v-if="account.editable && config.editable.collections" class="edit" />
        </div>
      </div>
      <div class="content">
        <Swiper v-slot="item:SwiperSlotData" :datalist="collect.nft_assets" >
          <div class="nft-item" @click="showDetail(item.data.id)">
            <Thumbnail :image="item.data.image" :error-text="false" :title="item.data.name" />
          </div>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditBtn from '@/components/EditBtn/MainEntry.vue'
import Swiper from '@/components/SwiperSmall/MainEntry.vue'
import Thumbnail from '@/components/Thumbnail/MainEntry.vue'
import { showDialog } from '@/state/nftDetail'
import { account } from '@/state/account'
import config from '@/state/config'

type SwiperSlotData = any

const props = defineProps<{collectionsList: Global.CollectionsList}>()

const showDetail = (assetsId: number) => showDialog(assetsId)
</script>

<style lang="less" scoped>
#Collections {
  margin-bottom: 30px;
}

.nft-assets {

  user-select: none;
  box-sizing: border-box;
  cursor: pointer;

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
    height: 130px;
    width: 130px;
    background: #F9F9FC;
    border-radius: 4px;
    margin-top: 14px;
    overflow: hidden;
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
  .nft-assets {
    width: 100vw;
    max-width: 388px;
    padding: 0 25px;

    .nft-item {
      width: 90px;
      height: 90px;
    }
  }
}
</style>
