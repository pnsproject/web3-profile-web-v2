<template>
  <div class="indenticon">
    <img :src="indenticonUrl" :alt="account.address">
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { account } from '@/state/account'

const indenticonUrl = computed(() => {
  if (!account.address) return ''

  const options = {
    foreground: [216, 140, 173, 255],
    background: [255, 255, 255, 255],
    margin: 0.2,
    size: 36,
    format: 'svg'
  }
  const Identicon = (window as any).Identicon
  return 'data:image/svg+xml;base64,' + new Identicon(account.address.slice(1), (options as any)).toString()
})
</script>

<style lang="less" scoped>

</style>
