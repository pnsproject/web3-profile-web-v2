<template>
  <div class="nft-thumbnail" :style="{width: '100%', height: '100%'}" ref="box">
    <img :src="appLoading" alt="loading" v-if="loading " class="loading">

    <img v-if="showDefault" :src="defaultPic" :alt="props.title" class="default">

    <video v-show="mp4Thumbnail && !showError"
           ref="videoItem"
           :src="mp4Thumbnail"
           autoplay loop muted
           @error="videoError"
           @play="videoloaded"
    >
      your browser does not support the video tag
    </video>

    <img v-if="thumbnail && !showError"
         :src="thumbnail"
         :alt="props.title"
         @error="onerror"
         @load="loaded"
    >

    <div v-if="svgThumbnail" v-html="svgThumbnail"></div>

    <Error v-if="showError && props.errorText" class="error-tip" @reload="reload"></Error>

    <svg v-if="showError && !props.errorText" class="error-pic" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.1375 16.175L22.0125 13C21.8963 12.8828 21.758 12.7898 21.6057 12.7264C21.4534 12.6629 21.29 12.6303 21.125 12.6303C20.96 12.6303 20.7966 12.6629 20.6443 12.7264C20.492 12.7898 20.3537 12.8828 20.2375 13L16.75 16.55L13.2625 13C13.1463 12.8828 13.008 12.7898 12.8557 12.7264C12.7034 12.6629 12.54 12.6303 12.375 12.6303C12.21 12.6303 12.0466 12.6629 11.8943 12.7264C11.742 12.7898 11.6037 12.8828 11.4875 13L8.625 15.925L5.7625 13C5.6463 12.8828 5.50805 12.7898 5.35572 12.7264C5.2034 12.6629 5.04002 12.6303 4.875 12.6303C4.70999 12.6303 4.54661 12.6629 4.39428 12.7264C4.24196 12.7898 4.10371 12.8828 3.9875 13L0.862503 16.125C0.748702 16.2439 0.659495 16.3841 0.600002 16.5375C0.535951 16.6878 0.501978 16.8492 0.500003 17.0125V21.75C0.500003 22.7446 0.895091 23.6984 1.59835 24.4017C2.30161 25.1049 3.25544 25.5 4.25 25.5H21.75C22.7446 25.5 23.6984 25.1049 24.4017 24.4017C25.1049 23.6984 25.5 22.7446 25.5 21.75V17.0625C25.498 16.8992 25.4641 16.7378 25.4 16.5875C25.3405 16.4341 25.2513 16.2939 25.1375 16.175ZM23 21.75C23 22.0815 22.8683 22.3995 22.6339 22.6339C22.3995 22.8683 22.0815 23 21.75 23H4.25C3.91848 23 3.60054 22.8683 3.36612 22.6339C3.1317 22.3995 3 22.0815 3 21.75V17.575L4.875 15.7L7.7375 18.575C7.85371 18.6922 7.99196 18.7852 8.14428 18.8486C8.29661 18.9121 8.45999 18.9447 8.625 18.9447C8.79002 18.9447 8.9534 18.9121 9.10572 18.8486C9.25805 18.7852 9.3963 18.6922 9.5125 18.575L12.375 15.7L15.8625 19.25C15.9787 19.3672 16.117 19.4602 16.2693 19.5236C16.4216 19.5871 16.585 19.6197 16.75 19.6197C16.915 19.6197 17.0784 19.5871 17.2307 19.5236C17.383 19.4602 17.5213 19.3672 17.6375 19.25L21.125 15.75L23 17.625V21.75ZM21.75 0.5H4.25C3.25544 0.5 2.30161 0.895088 1.59835 1.59835C0.895091 2.30161 0.500003 3.25544 0.500003 4.25V10.825C0.486978 10.9371 0.486978 11.0504 0.500003 11.1625C0.500003 11.1625 0.500003 11.25 0.500003 11.2875C0.578264 11.483 0.704636 11.6555 0.867389 11.7891C1.03014 11.9227 1.224 12.013 1.43098 12.0516C1.63796 12.0903 1.85135 12.076 2.05135 12.0102C2.25134 11.9444 2.43147 11.8291 2.575 11.675L4.875 9.45L7.7375 12.325C7.85371 12.4422 7.99196 12.5352 8.14428 12.5986C8.29661 12.6621 8.45999 12.6947 8.625 12.6947C8.79002 12.6947 8.9534 12.6621 9.10572 12.5986C9.25805 12.5352 9.3963 12.4422 9.5125 12.325L12.375 9.45L15.8625 13C15.9787 13.1172 16.117 13.2102 16.2693 13.2736C16.4216 13.3371 16.585 13.3697 16.75 13.3697C16.915 13.3697 17.0784 13.3371 17.2307 13.2736C17.383 13.2102 17.5213 13.1172 17.6375 13L21.125 9.5L23.3375 11.725C23.481 11.8791 23.6612 11.9944 23.8612 12.0602C24.0612 12.126 24.2745 12.1403 24.4815 12.1016C24.6885 12.063 24.8824 11.9727 25.0451 11.8391C25.2079 11.7055 25.3342 11.533 25.4125 11.3375C25.4186 11.3002 25.4186 11.2623 25.4125 11.225C25.4564 11.1132 25.4818 10.995 25.4875 10.875V4.25C25.4875 3.2576 25.0941 2.30566 24.3936 1.60276C23.693 0.899856 22.7424 0.503308 21.75 0.5ZM23 7.8L22.0125 6.75C21.8963 6.63284 21.758 6.53985 21.6057 6.47639C21.4534 6.41292 21.29 6.38025 21.125 6.38025C20.96 6.38025 20.7966 6.41292 20.6443 6.47639C20.492 6.53985 20.3537 6.63284 20.2375 6.75L16.75 10.3L13.2625 6.75C13.1463 6.63284 13.008 6.53985 12.8557 6.47639C12.7034 6.41292 12.54 6.38025 12.375 6.38025C12.21 6.38025 12.0466 6.41292 11.8943 6.47639C11.742 6.53985 11.6037 6.63284 11.4875 6.75L8.625 9.675L5.7625 6.75C5.6463 6.63284 5.50805 6.53985 5.35572 6.47639C5.2034 6.41292 5.04002 6.38025 4.875 6.38025C4.70999 6.38025 4.54661 6.41292 4.39428 6.47639C4.24196 6.53985 4.10371 6.63284 3.9875 6.75L3 7.8V4.25C3 3.91848 3.1317 3.60054 3.36612 3.36612C3.60054 3.1317 3.91848 3 4.25 3H21.75C22.0815 3 22.3995 3.1317 22.6339 3.36612C22.8683 3.60054 23 3.91848 23 4.25V7.8Z" fill="#D6D6DE"/>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import appLoading from '@/assets/logo_loading.svg'
import defaultPic from './assets/nft_default.png'
import Error from './Error.vue'
import { ref, watch } from 'vue'
import appConfig from '../../state/config'

const props = defineProps<{
  image: string | null
  title: string
  errorText: boolean
}>()

const loading = ref(true)

const showError = ref(false)

const showDefault = ref(false)

// svg预览
const svgThumbnail = ref('')

// mp4预览
const mp4Thumbnail = ref('')

// 普通图片预览
const thumbnail = ref('')

// 处理预览图
const processThumbnail = () => {
  if (!props.image) {
    loading.value = false
    showDefault.value = true
    return
  }
  // svg
  if (props.image.startsWith('data:image/svg+xml;utf8,<svg')) {
    svgThumbnail.value = props.image.replace('data:image/svg+xml;utf8,', '')
    loading.value = false
    return
  }

  // mp4
  if (props.image && props.image.endsWith('.mp4')) {
    mp4Thumbnail.value = props.image
    loading.value = false
    return
  }

  // ipfs or https
  if (props.image && props.image.startsWith('ipfs://')) {
    thumbnail.value = props.image.replace('ipfs://', (appConfig.ipfsGateway as string) + '/ipfs/')
  } else {
    thumbnail.value = props.image
  }
}

processThumbnail()

const reload = () => {
  loading.value = true
  showError.value = false
  svgThumbnail.value = ''
  mp4Thumbnail.value = ''
  thumbnail.value = ''
  processThumbnail()
}

watch(props, () => {
  reload()
})

// 图片加载出错处理,尝试当作MP4加载
const onerror = (e: any) => {
  thumbnail.value = ''
  mp4Thumbnail.value = props.image
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
</script>

<style lang="less" scoped>
.nft-thumbnail {
  position: relative;
  overflow: hidden;

  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .loading {
    .center;
    max-width: 100%;
    height: auto;
    z-index: 3;
    width: 20%;
  }

  img, div{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .error-tip {
    .center;
    width: 200px;
    height: 117px;
  }

  .error-pic {
    .center;
  }

  video {
    height: 100%;
    width: 100%;
    object-fit: scale-down;
  }
}
</style>
