<template>
  <div class="flex-text" :class='{active: active}' :style="{maxHeight: props.height + 'px'}">
    <span class="content" ref="content">{{ props. text }}</span>
    <div class="trigger-active" v-show="!active && !lackOfText">... <span @click="trigger">Read more</span></div>
    <div class="trigger-inactive" v-show="active"><span @click="trigger">Show less</span></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{text: string, height: string | number}>(), { text: '', height: 100 })

const active = ref(false)

const trigger = () => {
  active.value = !active.value
}

const lackOfText = ref(false)

const content = ref<HTMLElement>()

onMounted(() => {
  console.log(content.value)
  if (content.value) {
    const contentHeight = content.value.offsetHeight
    console.log('contentHeight', contentHeight)
    if (contentHeight < Number(props.height)) {
      lackOfText.value = true
    }
  }
})
</script>

<style lang="less" scoped>
  .flex-text {
    width: 100%;
    overflow: hidden;
    position: relative;

    &.active {
      height: auto!important;
      max-height: inherit!important;
    }

    .trigger-active {
      background: #fff;
      position: absolute;
      right: 0;
      bottom: 0;
      padding-left: 4px;
      cursor: pointer;
      span {
        color: #F03E76
      }
    }

    .trigger-inactive {
      color: #F03E76;
      cursor: pointer;
    }
  }
</style>
