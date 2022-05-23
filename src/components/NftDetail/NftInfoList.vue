<template>
  <div class="nft-info-list">
    <div class="info-item" v-if="false">
      <div class="tit">Last Price</div>
      <div class="val">0.14 ETH</div>
    </div>

    <div class="info-item">
      <div class="tit">Contract Address</div>
      <div class="val">
        <span>{{ address }}</span>
        <CopyText :show-text="false" :text="props.nft.contract"></CopyText>
        <Linker :to="addressLink"></Linker>
      </div>
    </div>

    <div class="info-item">
      <div class="tit">TokenID</div>
      <div class="val">{{ tokenId }}</div>
    </div>

    <div class="info-item">
      <div class="tit">Blockchain</div>
      <div class="val">ETHEREUM</div>
    </div>

    <div class="info-item" v-if="false">
      <div class="tit">IPFS</div>
      <div class="val"><Linker :to="ipfsLink"></Linker></div>
    </div>

    <div class="info-item" v-if="false">
      <div class="tit">IPFS Metadate</div>
      <div class="val"><Linker :to="ipfsLink"></Linker></div>
    </div>

    <div class="info-item">
      <div class="tit">Etherscan Transaction</div>
      <div class="val"><Linker :to="transactionLink"></Linker></div>
    </div>

    <div class="info-item">
      <div class="tit">External Url</div>
      <div class="val"><Linker :to="props.nft.external_url"></Linker></div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import CopyText from '@/components/CopyText/MainEntry.vue'
import Linker from '@/components/Link/MainEntry.vue'

const props = defineProps<{nft: Global.NftItem}>()

const address = computed(() => {
  const address = props.nft.contract.address
  return address.substring(0, 5) + '...' + address.substring(38)
})

const tokenId = computed(() => {
  const id = props.nft.token_id
  return id.startsWith('0x') ? parseInt(id, 16) : id
})

const addressLink = computed(() => {
  const address = props.nft.contract
  return `https://etherscan.io/address/${address}`
})

const ipfsLink = computed(() => {
  return ''
})

const transactionLink = computed(() => {
  return `https://etherscan.io/token/${props.nft.contract.address}?a=${tokenId.value}`
})
</script>

<style lang="less" scoped>
.nft-info-list {
  display: flex;
  flex-flow: column;

  .info-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    .tit {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
    }

    .val {
      font-size: 14px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      max-width: 200px;
      word-break: break-all;

      & > * {
        margin-left: 14px;
      }
    }
  }
}
</style>
