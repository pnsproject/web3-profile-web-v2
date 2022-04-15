<template>
  <keep-alive>
    <div class="nft-item">
      <Thumbnail :nft="props.nft" :size="[width, '306px']"></Thumbnail>
      <div class="info">
        <div class="name">{{ props.nft.name }}</div>
        <img class="chain" :src="props.icons['eth']" alt="eth">
      </div>
    </div>
  </keep-alive>
</template>

<script lang="ts" setup>
import Thumbnail from '@/components/Thumbnail/MainEntry.vue'
import { computed } from 'vue'
import { drive } from '../../../../../state/mobileCheck'

const props = defineProps<{
  icons: any,
  nft: Global.NftItem
}>()

const width = computed(() => {
  console.log(screen.width - 36 - 32)
  return drive.isMobile ? 'calc(100vw - 78px)' : '300px'
})
</script>

<style lang="less" scoped>
  .nft-item {
    display: flex;
    flex-flow: column nowrap;
    width: 340px;
    height: 370px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    border: 1px solid #E4E4E4;
    border-radius: 18px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 30px;
    margin-right: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.04);

    .thumbnail {
      width: 100%;
      min-height: 300px;
      max-height: 300px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      border-radius: 8px;

      .loading {
        width: 100px;
        z-index: 3;
      }

      img, video, div {
        position: absolute;
        width: 100%;
        height: auto;
        min-height: 260px;
        left: 50%;
        top:50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s;
      }
   }

    .info {
      display: flex;
      flex-flow: row nowrap;
      margin-top: 20px;

      .chain {
        min-width: 24px;
        margin-right: 4px;
      }

      .name {
        font-weight: 600;
        font-size: 20px;
        color: #000;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &:hover {
      box-shadow: 0 0 10px #cecece;
      .thumbnail {
        img, video, div {
          transform: translate(-50%, -50%) scale(1.08);
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .nft-item {
      margin-right: 0;
      width: 100%;
      .thumbnail {
        img, video, div {
          top: 0;
          transform: translate(-50%, 0) scale(1);
        }
      }

      &:hover {
        box-shadow: none;
        .thumbnail {
          img, video, div {
            top: 0;
            transform: translate(-50%, 0) scale(1);
          }
        }
      }
    }
  }
</style>
