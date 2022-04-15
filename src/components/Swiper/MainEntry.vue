<template>
  <div class="swiper-frame">
    <Navigator v-show="showLeftNav" position="left" @click="doPre"></Navigator>
    <Navigator v-show="showRightNav" position="right" @click="doNext"></Navigator>
    <Swiper
      :slides-per-view="props.pageSize"
      :space-between="props.itemSpace"
      :slides-per-group="props.pageSize"
      :speed="800"
      @swiper="onSwiper"
      @slide-change="onSlideChange">
      <SwiperSlide v-for="(item, index) in props.datalist" :key="index">
        <slot :data="item"></slot>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineComponent, reactive, watch } from 'vue'
import Navigator from './components/Navigator.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Swiper as SwiperClass } from 'swiper/types'

const props = defineProps<{
  datalist: Array<any>,
  pageSize: number
  itemSpace: number
}>()

const showLeftNav = ref(false)

const showRightNav = ref(true)

const swiper = reactive<{instance: SwiperClass | null}>({ instance: null })

const doNext = () => {
  if (swiper.instance) {
    swiper.instance.slideNext()
  }
}

const doPre = () => {
  if (swiper.instance) {
    swiper.instance.slidePrev()
  }
}

const onSwiper = (swiperInstance: SwiperClass) => {
  swiper.instance = swiperInstance
}

const onSlideChange = (swiperInstance: SwiperClass) => {
  if (swiperInstance.activeIndex === props.datalist.length - props.pageSize) {
    showLeftNav.value = true
    showRightNav.value = false
  } else if (swiperInstance.activeIndex === 0) {
    showLeftNav.value = false
    showRightNav.value = true
  } else {
    showLeftNav.value = true
    showRightNav.value = true
  }
}
</script>

<style lang="less" scoped>
  .swiper-frame {
    width: 100%;
    position: relative;
  }
</style>
