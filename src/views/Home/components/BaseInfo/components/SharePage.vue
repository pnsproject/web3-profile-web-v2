<template>
  <div v-if="show" id="SharePage">
    <div class="shell" @click="closeWindow"></div>
    <div class="close-btn" @click="closeWindow">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#BEBEBE"/>
      </svg>
    </div>
    <div class="content" :class="{active: activeContent}">
      <div class="title">Share this page</div>
      <div class="media-list">
        <ShareMedia class="media-item" v-for="item in shareMediaList" :key="item" :type="item">{{ item }}</ShareMedia>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import icons from './setting/share_media_icons'
import ShareMedia from './ShareMedia.vue'

const props = defineProps<{show: boolean}>()

const activeContent = ref(false)

const $emit = defineEmits(['update:show'])

const shareMediaList = computed(() => {
  const res = []
  for (const key in icons) {
    res.push(key)
  }
  return res
})

const closeWindow = () => {
  activeContent.value = false
}

watch(props, (newVal) => {
  if (newVal.show) {
    setTimeout(() => {
      activeContent.value = true
    }, 100)
  }
})

watch(activeContent, (newVal) => {
  if (!newVal) {
    $emit('update:show', false)
  }
})
</script>

<style lang="less" scoped>
  #SharePage {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    left: 0;
    top: 0;

    .shell {
      position: absolute;
      left: 0;
      top:0;
      width: 100%;
      height: 100%;
      background: #1d1c1c;
      opacity: 0.8;
    }

    .close-btn {
      cursor: pointer;
      width: 36px;
      height: 36px;
      position: absolute;
      top: 25px;
      right: 25px;
      background: rgba(255,255,255,0.15);
      border-radius: 50%;

      svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      &:hover {
        background: rgba(255,255,255,0.2);
      }
    }

    .content {
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%, -60%);
      border-radius: 12px;
      background: #fff;
      width: 444px;
      height: 236px;
      box-sizing: border-box;
      padding: 25px;
      transition: all 0.2s ease-out;

      &.active {
        transform: translate(-50%, -50%);
      }

      .title {
        font-weight: 600;
        font-size: 24px;
        line-height: 33px;
        color: #010008;
      }

      .media-list {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        margin-top: 30px;
        .media-item {
          margin: 0 4px;
          min-width: 62px;
          text-align: center;
        }
      }
    }
  }

  @media only screen and (max-width: 954px) {
    #SharePage {
      .content {
        left:0;
        top: auto;
        bottom:0;
        width: 100vw;
        height: 211px;
        border-radius: 24px 24px 0 0;
        transform: translate(0, 100%);

        &.active {
          transform: inherit;
        }
      }
    }
  }
</style>
