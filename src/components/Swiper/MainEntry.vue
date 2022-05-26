<template>
  <component :is="swiper" :datalist="datalist" v-slot="item">
    <slot :data="item.data"></slot>
  </component>
</template>

<script lang="ts" setup>
import SwiperWeb from './SwiperWeb.vue'
import SwiperWap from './SwiperWap.vue'
import { drive } from '@/state/mobileCheck'
import { computed } from 'vue'

const props = defineProps<{
  datalist: Array<any>
}>()

const swiper = computed(() => {
  return drive.isMobile ? SwiperWap : SwiperWeb
})

</script>
