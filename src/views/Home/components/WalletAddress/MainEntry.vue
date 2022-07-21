<template>
  <div id="WalletAddress" v-if="addressList.length">
    <div class="title">
      <div class="left">
        <span class="text">Address</span>
        <span class="count"> {{ addressList.length }}</span>
      </div>
      <div class="right">
        <span class="icons" :class="{ active }">
          <img v-for="item in addressList" :key="item.key" :src="icons[item.key][0]" :alt="item.key">
        </span>
        <span class="handel" :class="{ active }" @click="active = !active">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.9999 1.16994C10.8126 0.983692 10.5591 0.87915 10.2949 0.87915C10.0308 0.87915 9.77731 0.983692 9.58995 1.16994L5.99995 4.70994L2.45995 1.16994C2.27259 0.983692 2.01913 0.87915 1.75495 0.87915C1.49076 0.87915 1.23731 0.983692 1.04995 1.16994C0.95622 1.26291 0.881826 1.37351 0.831057 1.49537C0.780288 1.61723 0.75415 1.74793 0.75415 1.87994C0.75415 2.01195 0.780288 2.14266 0.831057 2.26452C0.881826 2.38638 0.95622 2.49698 1.04995 2.58994L5.28995 6.82994C5.38291 6.92367 5.49351 6.99806 5.61537 7.04883C5.73723 7.0996 5.86794 7.12574 5.99995 7.12574C6.13196 7.12574 6.26267 7.0996 6.38453 7.04883C6.50638 6.99806 6.61699 6.92367 6.70995 6.82994L10.9999 2.58994C11.0937 2.49698 11.1681 2.38638 11.2188 2.26452C11.2696 2.14266 11.2957 2.01195 11.2957 1.87994C11.2957 1.74793 11.2696 1.61723 11.2188 1.49537C11.1681 1.37351 11.0937 1.26291 10.9999 1.16994Z"
                  fill="#010008" />
          </svg>
        </span>
        <EditBtn v-if="account.editable && config.editable.baseInfo" class="edit" @click="gotoEdit"/>
      </div>
    </div>
    <div class="content" :class="{ active }">
      <div class="address-item" v-for="item in addressList" :key="item.key">
        <div class="icon" :style="{ background: icons[item.key][1] }">
          <img :src="icons[item.key][0]" :alt="item.key">
          <span :style="{ color: icons[item.key][2] }">{{ item.key }}</span>
        </div>
        <div class="value">
          <span>{{ shortAdds(item.value) }}</span>
          <img v-if="verifyInfo[item.key.toLowerCase()]"
               class="verify-icon"
               :src="item.key=== 'DOT' ? dotValidIcon : ethValidIcon"
               alt="Valid"
               title="Valid">
          <CopyText :text="item.value" :show-text="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditBtn from '@/components/EditBtn/MainEntry.vue'
import CopyText from '@/components/CopyText/MainEntry.vue'
import icons from './icons'
import { computed, ref } from 'vue'
import { account } from '@/state/account'
import { drive } from '@/state/mobileCheck'
import config from '@/state/config'
import dotValidIcon from './assets/dot_valid.svg'
import ethValidIcon from './assets/eth_valid.svg'
import verifyInfo from '@/state/addressValid'

const props = defineProps<{address: Global.Addr[]}>()

const addressList = computed(() => {
  let res: Global.Addr[] = []
  if (props.address) {
    res = props.address
      .filter(item => {
        return !!item.value && item.key !== 'KSM'
      })
      .reverse()
  }

  return res
})

const shortAdds = (address: string) => {
  if (drive.isMobile) {
    return address.substring(0, 12) + '...' + address.substr(-4)
  } else if (address.length > 42) {
    return address.substring(0, 35) + '...' + address.substr(-4)
  } else {
    return address
  }
}

const active = ref(false)

const contentHeight = computed(() => {
  return addressList.value.length * 46 + 'px'
})

const gotoEdit = () => {
  const currDomain = account.currDomain
  window.open(`${config.pnsUrl}/details/${currDomain}`, '_blank')
}
</script>

<style lang="less" scoped>
#WalletAddress {
  margin-bottom: 25px;
  user-select: none;
  box-sizing: border-box;

  .title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    .left, .right{
      display: flex;
      align-items: center;
    }

    .text {
      font-weight: 600;
      font-size: 16px;
      line-height: 100%;
      color: #010008;
    }

    .count {
      height: 16px;
      line-height: 16px;
      padding: 0 8px;
      font-weight: 400;
      font-size: 12px;
      text-align: center;
      color: #5A596E;
      background: #F9F8FC;
      margin-left: 6px;
      border-radius: 4px;
    }

    .edit {
      margin-left: 25px;
    }

    .handel {
      cursor: pointer;
      margin-left: 14px;
      transition: all 0.2s;

      &.active {
        transform: rotate(180deg);
      }
    }

    .icons {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      opacity: 1;
      transition: opacity 0.3s;

      &.active {
        opacity: 0;
      }

      img {
        margin-left: 8px;
      }
    }
  }

  .address-item {
    display: flex;
    flex-flow: row nowrap;
    margin-top: 16px;
    width: 100%;

    .icon, .value {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }

    .icon {
      height: 30px;
      line-height: 30px;
      padding: 0 6px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
      width: 70px;
      box-sizing: border-box;

      img {
        margin-right: 6px;
      }
    }

    .value {
      height: 30px;
      padding: 0 10px;
      margin-left: 4px;
      line-height: 30px;
      color: #89899A;
      background: #FCFCFC;
      border-radius: 6px;
      flex: 1;

      span {
        margin-right: 8px;
      }

      .verify-icon {
        margin-right: 8px;
      }
    }
  }

  .content {
    height: 0;
    overflow: hidden;
    transition: height 0.3s;

    &.active {
      height: v-bind('contentHeight');
    }
  }
}

@media only screen and (max-width: 954px) {
  #WalletAddress {
    width: 100vw;
    max-width: 388px;
    padding:  0 25px;
  }
}
</style>
