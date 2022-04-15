<template>
  <div class="nft-thumbnail" :style="{width: props.size[0], height: props.size[1]}" ref="box">
    <img :src="appLoading" alt="loading" v-if="loading" class="loading">

    <video :src="mp4Thumbnail"
           autoplay loop
           v-show="mp4Thumbnail"
           @error="videoError"
           @play="videoloaded"
           :width="mp4ThumbnailSize"
           ref="videoItem"
           muted>
      your browser does not support the video tag
    </video>

    <img v-if="thumbnail && !showError"
         :src="thumbnail"
         :alt="props.nft.title"
         @error="onerror"
         @load="loaded" >

    <div v-if="svgThumbnail" v-html="svgThumbnail"></div>

    <Error v-if="showError" class="error-tip" @reload="reload"></Error>
  </div>
</template>

<script lang="ts" setup>
import appLoading from '@/assets/logo_loading.svg'
import Error from './Error.vue'
import { computed, ref, onMounted, onUpdated } from 'vue'
import appConfig from '../../state/config'
const props = defineProps<{
  nft: Global.NftItem
  size: [string, string]
}>()

const loading = ref(true)

const showError = ref(false)

// mp4预览尺寸
const mp4ThumbnailSize = computed(() => {
  return Math.min(screen.width, window.innerWidth) <= 750 ? screen.width - 36 - 32 : 306
})

// svg预览
const svgThumbnail = ref('')

// mp4预览
const mp4Thumbnail = ref('')

// 普通图片预览
const thumbnail = ref('')

// 处理预览图
const processThumbnail = () => {
  // svg
  if (props.nft.image && props.nft.image.startsWith('data:image/svg+xml;utf8,<svg')) {
    svgThumbnail.value = props.nft.image.replace('data:image/svg+xml;utf8,', '')
    loading.value = false
    return
  }

  // mp4
  if (props.nft.image && props.nft.image.endsWith('.mp4')) {
    mp4Thumbnail.value = props.nft.image
    loading.value = false
    return
  }

  // ipfs or https
  if (props.nft.image && props.nft.image.startsWith('ipfs://')) {
    thumbnail.value = props.nft.image.replace('ipfs://', appConfig.ipfsGateway)
  } else {
    thumbnail.value = props.nft.image
  }
}

processThumbnail()

// 图片加载出错处理,尝试加载当作MP4
const onerror = (e: any) => {
  thumbnail.value = ''
  mp4Thumbnail.value = props.nft.image
  loading.value = true
  // showError.value = true
}

// mp4加载出错处理
const videoError = (e: any) => {
  if (mp4Thumbnail.value) {
    loading.value = false
    showError.value = true
  }
}

// 图片加载完毕
const loaded = (e: any) => {
  loading.value = false
  showError.value = false
}

// mp4加载完毕
const videoloaded = (e: any) => {
  loading.value = false
  showError.value = false
}

const reload = () => {
  loading.value = true
  showError.value = false
}
</script>

<style lang="less" scoped>
  .nft-thumbnail {
    position: relative;
    overflow: hidden;
    border-radius: 8px;

    .loading {
      width: 100px;
      z-index: 3;
    }

    img, video, div, .error-tip {
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
</style>
