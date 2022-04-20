<template>
  <div class="edit-frame" :class="{mobile: isMobile, active: active}" v-if="show">
    <div class="header">
      <div class="row">
        <div class="close-btn" @click="active=false">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd"
                  d="M0 9.51682V8.48318L8.68894 0.214073C8.98886 -0.0713577 9.47513 -0.071358 9.77506 0.214073C10.075 0.499505 10.075 0.962281 9.77506 1.24771L1.62918 9L9.77506 16.7523C10.075 17.0377 10.075 17.5005 9.77506 17.7859C9.47513 18.0714 8.98886 18.0714 8.68894 17.7859L0 9.51682Z"
                  fill="black"
            />
          </svg>
        </div>
        <div class="tit">{{ editWindows.option.title }}</div>
      </div>
    </div>
    <div class="content">
      <Editor @cancel="active=false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { drive } from '@/state/mobileCheck'
import { computed, ref, watch, defineAsyncComponent } from 'vue'
import { editWindows, closeWindow } from '@/state/editWindows'

const show = computed(() => {
  return editWindows.show
})

const editType = computed(() => {
  return editWindows.editType
})

const Editor = defineAsyncComponent(() => {
  return import(`./components/${editType.value}/MainEntry.vue`)
})

const active = ref(false)

const isMobile = computed(() => {
  return drive.isMobile
})

watch(editWindows, (newVal) => {
  if (newVal.show) {
    setTimeout(() => {
      active.value = true
    }, 100)
  }
}, { immediate: true })

watch(active, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      closeWindow()
    }, 300)
  }
})
</script>

<style lang="less" scoped>
.edit-frame {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: -100vw;
  top: 0;
  background: #fff;
  z-index: 9999;
  transition: left 0.3s;

  .header {
    .row {
      width: 954px;
      margin: 0 auto;
      position: relative;
      height: 60px;
    }

    .close-btn {
      cursor: pointer;
      height: 60px;
      width: 66px;
      position: relative;
      padding: 20px 28px;
      box-sizing: border-box;
      transform: translate(-28px, 0);
    }

    .tit {
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%, -50%);
      color: #010008;
      font-size: 16px;
    }
  }

  .content {
    height: calc(100vh - 60px);
  }

  &.active {
    left: 0;
  }

  &.mobile {
    .header {
      .row {
        width: 100%;

        .close-btn {
          transform: translate(0, 0);
        }
      }
    }
  }
}
</style>
