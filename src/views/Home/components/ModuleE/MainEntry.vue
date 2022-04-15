<template>
  <div class="module-e" v-if="props.nftList.length">
    <div class="page-with">
      <h2>NFTs</h2>
      <div class="nft-list">
        <NftItem v-for="item in itemToShow"
                 :key="item.title"
                 :icons="icons"
                 :nft="item"
                 @click="showDetail(item)">
        </NftItem>
      </div>
      <div class="load-more" @click="loadMore" v-show="!isAll">Load more</div>
    </div>
  </div>
  <NftDetail ref="detail"></NftDetail>
</template>

<script lang="ts" setup>
import NftItem from './components/NftItem.vue'
import NftDetail from './components/NftDetail.vue'
import btcIcon from './assets/btc.svg'
import ethIcon from './assets/eth.svg'
import dotIcon from './assets/polkadot.svg'
import ksmIcon from './assets/kusama.svg'
import { computed, ref } from 'vue'
import { drive } from '../../../../state/mobileCheck'

const props = defineProps<{nftList: Global.NftItem[]}>()

const icons = {
  btc: btcIcon,
  eth: ethIcon,
  dot: dotIcon,
  ksm: ksmIcon
}

const page = ref(1)

const pageSize = computed(() => {
  return drive.isMobile ? 3 : 6
})

const itemToShow = computed(() => {
  return props.nftList.filter((item, index) => {
    return index < page.value * pageSize.value
  })
})

const isAll = computed(() => {
  return itemToShow.value.length === props.nftList.length
})

const switchPage = (index: number) => {
  page.value = index
}

const detail = ref<any>()

const showDetail = (item: Global.NftItem) => {
  detail.value.open(item)
}

const loadMore = () => {
  if (isAll.value) return

  page.value = page.value + 1
}

</script>

<style lang="less" scoped>
  .module-e {
    h2 {
      font-size: 36px;
      color: #201A1B;
      line-height: 72px;
      border-bottom: 1px solid #EAEAEA;
      margin-bottom: 36px;
    }

    .nft-list {
      display: flex;
      flex-flow: row wrap;
      width: calc(100% + 20px);
    }

    .load-more {
      display: block;
      margin: 44px auto;
      width: 240px;
      height: 40px;
      background: #F3F3F7;
      border-radius: 8px;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      color:#010008;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
      position: relative;

      &:hover {
        box-shadow: 0 1px 5px #dcdbdb;
      }

      &:active {
       transform: translate(10px 10px);
      }
    }
  }

  @media only screen and (max-width: 550px) {
    .module-e {
      .nft-list {
        width: 100%;
      }
      h2 {
        font-size: 26px;
      }
    }
  }
</style>
