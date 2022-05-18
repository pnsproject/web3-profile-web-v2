<template>
  <div class="nft-detail" v-if="show">
    <div class="detail-window" :class="{active: contentActive}" :style="{ width : width }">
<!--      <Thumbnail :nft="nft.info" :size="['420px', '420px']" class="thumbnail" v-if="!isMobile"></Thumbnail>-->
      <div class="detail">
        <div class="handle">
          <span >NFT DETAILS</span>
          <span class="close" @click="close">
            <svg t="1646385760653" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3153" width="10" height="10"><path d="M155.252 943.825c-19.213 0-38.429-7.332-53.089-21.988-29.317-29.321-29.317-76.855 0-106.175l713.494-713.494c29.317-29.321 76.853-29.321 106.175 0 29.317 29.317 29.317 76.855 0 106.175l-713.494 713.494c-14.66 14.66-33.874 21.988-53.089 21.988z" fill="#D2D2D2" p-id="3154"></path><path d="M868.749 943.824c-19.213 0-38.428-7.332-53.089-21.988l-713.494-713.493c-29.317-29.317-29.317-76.857 0-106.175 29.316-29.317 76.855-29.321 106.174 0l713.494 713.492c29.317 29.321 29.317 76.855 0 106.175-14.657 14.661-33.871 21.993-53.087 21.993z" fill="#D2D2D2" p-id="3155"></path></svg>
          </span>
        </div>
        <div class="des">
          <div class="tit">{{ nft.info.name }}</div>
          <FlexibleText
            class="des-text"
            height="60"
            :text="nft.info.description">
          </FlexibleText>
          <NftInfoList :nft="nft.info" class="list"></NftInfoList>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { drive } from '@/state/mobileCheck'
import Thumbnail from '@/components/Thumbnail/MainEntry.vue'
import FlexibleText from '@/components/FlexibleText/MainEntry.vue'
import NftInfoList from './NftInfoList.vue'
import appConfig from '@/state/config'

const show = ref(false)

const contentActive = ref(false)

const nft = reactive<{info: Global.NftItem | any}>({ info: null })

const width = computed(() => {
  return drive.isMobile ? '90%' : '800px'
})

const isMobile = computed(() => {
  return drive.isMobile
})

const open = (nftInfo: Global.NftItem) => {
  const body: any = document.querySelector('body')
  body.style.height = '100vh'
  body.style.overflow = 'hidden'
  body.style.paddingRight = appConfig.scrollBarWidth + 'px'
  nft.info = nftInfo
  show.value = true
}

const close = () => {
  const body: any = document.querySelector('body')
  body.style.height = 'auto'
  body.style.overflow = 'auto'
  body.style.paddingRight = '0'
  show.value = false
  nft.info = null
}

watch(show, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      contentActive.value = true
    })
  } else {
    contentActive.value = false
  }
})

defineExpose({ open, close })
</script>

<style lang="less" scoped>
  .nft-detail {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.6);
  }

  .detail-window {
    width: 800px;
    min-height: 460px;
    min-width: 300px;
    background: #fff;
    border-radius: 12px;
    position: absolute;
    left: 50%;
    top:48%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;
    padding: 20px 0 20px 20px;
    display: flex;
    flex-flow: row nowrap;

    &.active {
      opacity: 1;
      top: 50%
    }

    .thumbnail {
      margin-right: 30px;
    }

    .detail {
      flex: 1;
      height: 420px;
      overflow: auto;
      margin-right: 6px;
      padding-right: 24px;

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

        .close {
          cursor: pointer;
          width: 24px;
          height: 24px;
          background: #F3F3F7;
          line-height: 26px;
          text-align: center;
          border-radius: 50%;
          position: absolute;
          right: 20px;
          top: 20px;
          z-index: 999;

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
      }

      .des {
        .tit {
          font-weight: 600;
          font-size: 18px;
          line-height: 22px;
          color: #000;
          margin-bottom: 10px;
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
          color: #010008;
          position: relative;
        }
      }
    }
  }
</style>
