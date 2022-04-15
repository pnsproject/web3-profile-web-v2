<template>
  <div class="module-b">
    <div class="page-with">
      <h2>Statistics</h2>
      <div class="info-list">
        <div class="info-item address">
          <div class="title">Address</div>
          <div class="amount"> {{ addrAmount }}</div>
        </div>
        <div class="info-item domain">
          <div class="title">Domains</div>
          <div class="amount"> {{ props.domainList.length }}</div>
        </div>
        <div class="info-item coming-soon">
          <div class="text">Coming Soon</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DomainDetails, GraphDomainDetails } from 'pns-sdk'
import { computed } from 'vue'

const props = defineProps<{domainInfo:DomainDetails;domainList:GraphDomainDetails[]}>()

const addrAmount = computed(() => {
  let flag = 0
  props.domainInfo.addrs.forEach((item) => {
    if (item.value) {
      flag = flag + 1
    }
  })
  return flag
})
</script>

<style lang="less" scoped>
  .module-b {
    h2 {
      font-size: 36px;
      color: #201A1B;
      line-height: 72px;
      border-bottom: 1px solid #EAEAEA;
      margin-bottom: 36px;
    }
    .info-list {
      display: flex;
      flex-flow: row wrap;

      .info-item {
        background: #F9F8FC;
        padding: 24px 28px;
        width: 228px;
        position: relative;
        box-sizing: border-box;
        border-radius: 16px;
        margin-right: 30px;

        &.address {
          color: #F03E76
        }

        &.domain {
          color: #0077FA
        }

        &.coming-soon {
          color: #D6D6DE
        }

        .title {
          font-weight: 600;
          font-size: 24px;
          line-height: 29px;
          margin-bottom: 12px;
        }
        .amount {
          font-weight: bold;
          font-size: 48px;
          line-height: 59px;
        }

        .text {
          text-align: center;
          font-weight: 600;
          font-size: 24px;
          line-height: 29px;
          position: absolute;
          left: 50%;
          top:50%;
          white-space: nowrap;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  @media only screen and (max-width: 550px) {
    .module-b {
      h2 {
        font-size: 26px;
      }
      .info-list{
        .info-item {
          margin-right: 0;
          width: 100%;
          margin-bottom: 12px;
        }
      }
    }
  }
</style>
