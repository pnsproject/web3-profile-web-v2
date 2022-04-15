<template>
  <a class="domain-item"
     target="_blank"
     :href="detailUrl">
    <div class="eth" v-if="chain === 'eth'">
      <div class="bg2 eth" ></div>
      <img :src="ensLogo" alt="pns" class="pns-logo">
      <div class="domain">{{ props.domain.toLowerCase() }}</div>
      <div class="title">Ethereum Name System</div>
      <div class="des">
        <span>A domain name system for</span>
        <img :src="ethLogo">
        <span style="color:#000;font-weight: 600">Ethereum</span>
      </div>
    </div>

    <div class="dot" v-else>
      <div class="bg2 dot"></div>
      <img :src="pnsLogo" alt="pns" class="pns-logo">
      <div class="domain">{{ props.domain.toLowerCase() }}</div>
      <div class="title">Polkadot Name System</div>
      <div class="des"><span>A domain name system for</span><img :src="polkadotLogo"></div>
    </div>
  </a>
</template>

<script lang="ts" setup>
import pnsLogo from '../assets/pnslogo.svg'
import ensLogo from '../assets/ens.svg'
import polkadotLogo from '../assets/polkadot_2.svg'
import ethLogo from '../assets/eth.svg'
import appConfig from '../../../../../state/config'
import { computed } from 'vue'

const props = defineProps<{
  domain: string
}>()

const chain = computed(() => {
  return props.domain.split('.').pop()
})

const detailUrl = computed(() => {
  return chain.value === 'eth' ? `https://app.ens.domains/name/${props.domain}` : `${appConfig.pnsUrl}/details/${props.domain.toLowerCase()}`
})
</script>

<style lang="less" scoped>
  .domain-item {
    max-width: 340px;
    height: 284px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    border: 1px solid #E4E4E4;
    border-radius: 12px;
    padding: 22px;
    transition: all 0.2s;
    display: block;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.04);


    &:hover {
      box-shadow: 0 0 10px #cecece;
    }

    .eth {
      flex: 1;
      z-index: 2;
      position: relative;
      .title {
        color: #0a6abc;
      }
    }

    .dot {
      flex: 1;
      z-index: 2;
      position: relative;
      .title {
        color: #F03E76;
      }
    }

    .bg2 {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      top:0;
      left: 0;
      filter: blur(80px);
      opacity: 0.3;

      &.eth {
        background-image: linear-gradient(40deg , #57FFE1, #ffffff 20% 60%, #0a6abc 100%);
      }

      &.dot {
        background-image: linear-gradient(40deg ,#57FFE1, #ffffff 40% 60%, #FF3271 100%);
      }
    }

    .pns-logo {
      height: 30px;
      z-index: 2;
    }

    .domain {
      font-weight: 600;
      font-size: 36px;
      color: #0F0E2E;
      text-align: center;
      z-index: 2;
      word-break: break-all;
      height: 126px;
      transition: all 0.2s;
      margin-top: 30px;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .title {
      text-align: center;
      width: 100%;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 7px;
      margin-top: 10px;
    }

    .des {
      display: flex;
      flex-flow: row nowrap;
      color: #ACACAC;
      font-weight: 500;
      font-size: 13px;
      line-height: 100%;
      gap: 4px;
      width: 100%;
      align-items: center;
      justify-content: center;

      img {
        height: 17px;
      }
    }

    &:hover {
      .dot .domain {
        color: #F03E76;
      }

      .eth .domain {
        color: #0a6abc;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .domain-item {
      width: 100%;
      max-width: inherit;
    }
  }
</style>
