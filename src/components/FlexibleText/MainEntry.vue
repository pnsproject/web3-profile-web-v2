<template>
  <div class="flex-text" :class='{active: active}' :style="{maxHeight: props.height + 'px'}">
    <span v-if="isHtml" class="content" ref="content"  v-html="props.text"></span>
    <span v-else class="content" ref="content">{{ props.text }}</span>
    <div class="trigger-active" v-show="!active && !lackOfText">... <span @click="trigger">Read more</span></div>
    <div class="trigger-inactive" v-show="active"><span @click="trigger">Show less</span></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{text: string, height: string | number, isHtml?: boolean}>(), { text: '', height: 100 })

const active = ref(false)

const trigger = () => {
  active.value = !active.value
}

const lackOfText = ref(false)

const content = ref<HTMLElement>()

watch(props, (newVal) => {
  if (content.value) {
    const contentHeight = content.value.offsetHeight
    console.log('contentHeight', contentHeight)
    if (contentHeight < Number(props.height)) {
      lackOfText.value = true
    }
  }
}, { immediate: true })

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

    .content {
      &::v-deep a{
        color: #89899a;
      }
    }

    &.active {
      height: auto!important;
      max-height: inherit!important;
    }

    .trigger-active {
      background: #000;
      position: absolute;
      right: 0;
      bottom: 0;
      padding-left: 4px;
      cursor: pointer;
      line-height: 17px;
      span {
        color: #F03E76;
      }
    }

    .trigger-inactive {
      color: #F03E76;
      cursor: pointer;
    }
  }
</style>
