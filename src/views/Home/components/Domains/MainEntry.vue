<template>
  <div id="Domains">
    <div class="title">
      <div class="left">
        <span class="text">Domains</span>
        <span class="count"> {{ props.domainsList.length }}</span>
      </div>
      <div class="right">
        <EditBtn v-if="account.editable && config.editable.domain" @click="showWindow('EditGalaxCredentials', {title:'My Domain', data: domainsList})" class="edit" />
      </div>
    </div>
    <div class="content">
      <Swiper v-slot="item:SwiperSlotData" :datalist="props.domainsList">
        <div class="nft-item" @click="goToDetail(item.data.name)">
          {{ item.data.name }}
        </div>
      </Swiper>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditBtn from '@/components/EditBtn/MainEntry.vue'
import Swiper from '@/components/Swiper/MainEntry.vue'
import { account } from '@/state/account'
import { showWindow } from '@/state/editWindows'
import config from '@/state/config'

type SwiperSlotData = any

const props = defineProps<{domainsList: Global.DomainItem[]}>()

const goToDetail = (name: string) => {
  if (name.endsWith('.dot')) {
    window.open(`${config.pnsUrl}/details/${name}`, '_blank')
  } else {
    window.open(`${config.ensUrl}/name/${name}`, '_blank')
  }
}
</script>

<style lang="less" scoped>
#Domains {
  margin-bottom: 30px;
  user-select: none;
  box-sizing: border-box;

  .title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

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
    cursor: pointer;
  }

  .content {
    transition: height 0.3s;
    display: flex;
    flex-flow: row nowrap;
    align-content: baseline;
  }
}

@media only screen and (max-width: 954px) {
  #Domains {
    width: 100vw;
    max-width: 388px;
    padding: 0 25px;
  }
}
</style>
