<template>
  <div class="module-d">
    <div class="page-with">
      <h2>Domains</h2>
      <div class="domain-list">
        <Swiper
          :datalist="props.domainList"
          v-slot="item:SwiperSlotData"
          :item-space="20"
          :page-size="pageSize">
          <DomainItem :domain="item.data.name"></DomainItem>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DomainItem from './components/DoaminItem.vue'
import Swiper from '@/components/Swiper/MainEntry.vue'
import { GraphDomainDetails } from 'pns-sdk'
import { computed } from 'vue'
import { drive } from '../../../../state/mobileCheck'

type SwiperSlotData = { data: any | GraphDomainDetails }

const props = defineProps<{domainList:GraphDomainDetails[]}>()

const pageSize = computed(() => {
  return drive.isMobile ? 1 : 3
})
</script>

<style lang="less" scoped>
  .module-d {
    h2 {
      font-size: 36px;
      color: #201A1B;
      line-height: 72px;
      border-bottom: 1px solid #EAEAEA;
      margin-bottom: 36px;
    }
    .domain-list {
      display: flex;
      flex-flow: row wrap;

      &::v-deep .swiper {
        padding: 10px;
        margin-left: -10px;
      }
    }
  }

  @media only screen and (max-width: 550px) {
    .module-d {
      h2 {
        font-size: 26px;
      }
    }
  }
</style>
