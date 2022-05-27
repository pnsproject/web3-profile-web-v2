<template>
  <div class="swiper-frame swiper-wap">
    <Swiper
      slidesPerView="auto"
      :slides-per-group-auto="true"
      :space-between="10" >
      <SwiperSlide v-for="(item, index) in datalist" :key="index">
        <slot :data="item"></slot>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode } from 'swiper'
import './style.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    datalist: Array
  },
  setup () {
    return {
      modules: [FreeMode]
    }
  }
}
</script>

<style lang="less" scoped>
  .swiper-frame {
    width: 100%;
    position: relative;
  }
</style>
