<template>
  <div class="social-media-list">
    <MediaItem v-for="item in socialMediaList" :mediaItem="item" :key="item.name"></MediaItem>
  </div>
</template>

<script lang="ts" setup>
import MediaItem from '@/components/SocialMediaList/components/MediaItem.vue'
import { mediaList } from '@/components/SocialMediaList/mediaConfig'
import { computed } from 'vue'
import { DomainDetails } from 'pns-sdk'

const props = defineProps<{ domainInfo: DomainDetails }>()

const socialMediaList = computed(() => {
  const res: Global.MediaItem[] = []
  props.domainInfo.textRecords.forEach((record: {key: string, value: string}) => {
    const mediaInfo = mediaList.filter((media: Global.MediaItem) => {

      return record.value && media.recordKey === record.key
    })
    if (mediaInfo.length) {
      mediaInfo[0].value = record.value
      res.push(mediaInfo[0])
    }
  })
  return res
})
</script>

<style lang="less" scoped>
  .social-media-list {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    max-width: 800px;
  }
</style>
