<template>
  <div class="nft-detail" v-if="show">
    <span class="close" @click="close">
      <svg t="1646385760653" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3153" width="10" height="10"><path d="M155.252 943.825c-19.213 0-38.429-7.332-53.089-21.988-29.317-29.321-29.317-76.855 0-106.175l713.494-713.494c29.317-29.321 76.853-29.321 106.175 0 29.317 29.317 29.317 76.855 0 106.175l-713.494 713.494c-14.66 14.66-33.874 21.988-53.089 21.988z" fill="#D2D2D2" p-id="3154"></path><path d="M868.749 943.824c-19.213 0-38.428-7.332-53.089-21.988l-713.494-713.493c-29.317-29.317-29.317-76.857 0-106.175 29.316-29.317 76.855-29.321 106.174 0l713.494 713.492c29.317 29.321 29.317 76.855 0 106.175-14.657 14.661-33.871 21.993-53.087 21.993z" fill="#D2D2D2" p-id="3155"></path></svg>
    </span>
    <PageLoading v-if="loading"></PageLoading>
    <div v-else class="detail-window" :class="{active: contentActive}">
      <div class="thumbnail">
        <Thumbnail :image="nft.image_url" :title="nft.contract?.name || ''" :error-text="true"></Thumbnail>
      </div>
      <div class="detail">
        <div class="des">
          <div class="tit">
            {{ `${nft.contract.name} #${nft.token_id}`}}
            <img class="chain-icon" :src="chainIcons[nft.chain_id]" alt="">
          </div>
          <FlexibleText
            class="des-text"
            height="60"
            :text="nft.contract.description">
          </FlexibleText>
          <NftInfoList v-if="nft.token_id" :nft="nft" class="list"></NftInfoList>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import axios from '@/plugins/axios'
import { drive } from '@/state/mobileCheck'
import Thumbnail from '@/components/Thumbnail/MainEntry.vue'
import FlexibleText from '@/components/FlexibleText/MainEntry.vue'
import NftInfoList from './NftInfoList.vue'
import PageLoading from '@/components/PageLoading/MainEntry.vue'
import { nftDetailDialog, closeDialog } from '@/state/nftDetail'
import chainIcons from './chianIncons'

const show = computed(() => {
  return nftDetailDialog.show
})

const assetsId = computed(() => {
  return nftDetailDialog.assetsId
})

const contentActive = ref(false)

const loading = ref(true)

const nft = ref<Global.NftItem>({
  chain_id: 0,
  contract: {},
  external_url: '',
  id: 0,
  image_url: '',
  token_id: ''
})

const isMobile = computed(() => {
  return drive.isMobile
})

const close = () => {
  return closeDialog()
}

watch(assetsId, async (newVal) => {
  if (!newVal) return
  loading.value = true
  const res = await axios.get(`/api/nft_assets/${newVal}`)
  console.log(res, res)
  nft.value = res.data
  loading.value = false
}, { immediate: true })

watch(loading, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      contentActive.value = true
    })
  } else {
    contentActive.value = false
  }
})
</script>

<style lang="less" scoped>
  .nft-detail {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 999;
    background: rgb(0, 0, 0);
    color:#fff
  }

  .close {
    cursor: pointer;
    width: 36px;
    height: 36px;
    background: rgba(255,255,255,.15);
    line-height: 36px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    right: 30px;
    top: 30px;
    z-index: 999;

    svg path {
      fill: #D2D2D2;
    }

    &:hover {
      background: #fff4f8;

      svg  path {
        fill: #F2739B
      }
    }

    &:active {
      svg  path {
        fill: #C51351;
      }
    }
  }

  .detail-window {
    width: 954px;
    height: 550px;
    background: #000;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    margin: 0 auto;

    &.active {
      opacity: 1;
    }

    .thumbnail {
      width:550px;
      border-radius: 12px;
      overflow: hidden;
    }

    .detail {
      flex: 1;
      height: 100%;
      overflow: auto;
      margin-left: 30px;

      &::-webkit-scrollbar {
        width: 4px;
      }

      .handle {
        font-size: 12px;
        color: #89899A;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-bottom: 15px;
        align-items: center;
        margin-top: 10px;
      }

      .des {
        .tit {
          font-weight: 600;
          font-size: 36px;
          line-height: 49px;
          margin-bottom: 10px;
          margin-top: 32px;
          word-break: break-all;

          .chain-icon {
            width: 24px;
            height: 24px;
          }
        }

        .list {
          position: relative;
          margin-top: 25px;
          &:before {
            content: '';
            height: 1px;
            width: 100%;
            display: block;
            background: #EAEAEA;
            position: absolute;
            top: 0;
            left: 0;
          }
        }

        .des-text {
          font-size: 14px;
          line-height: 20px;
          color: #fff;
          position: relative;
        }
      }
    }
  }

  @media only screen and (max-width: 954px) {
    .detail-window {
      width: 100vw;
      max-width: 325px;
      display: block;
      height: 100vh;

      .detail {
        height: calc(100vh - 435px);
        margin: 0;
      }

      .close {
        right: 0;
        top: 25px;
        transform: translate(0,0);
      }
      .thumbnail {
        width: 100vw;
        max-width: 325px;
        height: 100vw;
        max-height: 325px;
        margin-top: 80px;
      }
    }
  }
</style>
