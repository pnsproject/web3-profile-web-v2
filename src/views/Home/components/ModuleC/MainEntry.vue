<template>
  <div class="module-c" v-if="showModule">
    <div class="page-with">
      <h2>Address</h2>
      <div class="address-list">
        <AddressItem v-for="item in addrList"
                     :key="item.name"
                     :config="item"
                     :address="item.value">
        </AddressItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import AddressItem from './components/AddressItem.vue'
import btcIcon from './assets/btc.svg'
import ethIcon from './assets/eth.svg'
import dotIcon from './assets/polkadot.svg'
import ksmIcon from './assets/kusama.svg'
import { DomainDetails } from 'pns-sdk'

const props = defineProps<{ domainInfo: DomainDetails }>()

const config: Global.AddressConfig[] = [
  {
    name: 'btc',
    color: '#DC8027',
    background: '#FFEDDF',
    icon: btcIcon,
    value: ''
  },
  {
    name: 'eth',
    color: '#7867D4',
    background: '#F5EEFF',
    icon: ethIcon,
    value: ''
  },
  {
    name: 'dot',
    color: '#E71763',
    background: '#FFECEF',
    icon: dotIcon,
    value: ''
  },
  {
    name: 'ksm',
    color: '#474747',
    background: '#F2F2F2',
    icon: ksmIcon,
    value: ''
  }
]

const addrList = computed(() => {
  return props.domainInfo.addrs.map((item: {key: string, value: string}) => {
    const getConfig = config.find(config => config.name === item.key.toLowerCase()) as Global.AddressConfig
    getConfig.value = item.value
    return getConfig
  })
})

const showModule = computed(() => {
  let flag = 0
  props.domainInfo.addrs.forEach((item) => {
    if (item.value) {
      flag = flag + 1
    }
  })

  return !!flag
})
</script>

<style lang="less" scoped>
  .module-c {
    h2 {
      font-size: 36px;
      color: #201A1B;
      line-height: 72px;
      border-bottom: 1px solid #EAEAEA;
      margin-bottom: 36px;
    }
    .address-list {
      display: flex;
      flex-flow: column wrap;
    }
  }

  @media only screen and (max-width: 550px) {
    .module-c {
      h2 {
        font-size: 26px;
      }
    }
  }
</style>
