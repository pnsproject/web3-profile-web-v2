<template>
  <div class="swiper-frame">
    <Navigator v-show="showLeftNav" position="left" @click="doPre"></Navigator>
    <Navigator v-show="showRightNav" position="right" @click="doNext"></Navigator>
    <Swiper
      :slides-per-view="'auto'"
      :space-between="10"
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
import { ref, reactive, onMounted } from 'vue'
import Navigator from './components/Navigator.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Swiper as SwiperClass } from 'swiper/types'

const props = defineProps<{
  datalist: Array<any>
}>()

const showLeftNav = ref(false)

const showRightNav = ref(false)

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

const onSlideChange = (swiperInstance: SwiperClass) => {
  showRightNav.value = !swiperInstance.isEnd
  showLeftNav.value = !swiperInstance.isBeginning
}

const onSwiper = (swiperInstance: SwiperClass) => {
  swiper.instance = swiperInstance
  onSlideChange(swiperInstance)
}
</script>

<style lang="less" scoped>
  .swiper-frame {
    width: 100%;
    position: relative;
  }
</style>
