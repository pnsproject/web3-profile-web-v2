<template>
  <header class="page-header-a" :class="{mobile: isMobile}">
    <div class="page-with">
      <a :href="pnsUrl" class="logo">
        <img :src="Logo" class="logo-wap" alt="pns web3 profile">
        <img :src="Logo2" class="logo-web" alt="pns web3 profile">
      </a>
      <div class="header-right" v-if="arrowConnect">
        <div class="connect-wallet" @click="connect" v-if="!account.address">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 4H16V3C16 2.20435 15.6839 1.44129 15.1213 0.87868C14.5587 0.316071 13.7956 0 13 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V15C0 15.7956 0.316071 16.5587 0.87868 17.1213C1.44129 17.6839 2.20435 18 3 18H17C17.7956 18 18.5587 17.6839 19.1213 17.1213C19.6839 16.5587 20 15.7956 20 15V7C20 6.20435 19.6839 5.44129 19.1213 4.87868C18.5587 4.31607 17.7956 4 17 4ZM3 2H13C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3V4H3C2.73478 4 2.48043 3.89464 2.29289 3.70711C2.10536 3.51957 2 3.26522 2 3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2ZM18 12H17C16.7348 12 16.4804 11.8946 16.2929 11.7071C16.1054 11.5196 16 11.2652 16 11C16 10.7348 16.1054 10.4804 16.2929 10.2929C16.4804 10.1054 16.7348 10 17 10H18V12ZM18 8H17C16.2044 8 15.4413 8.31607 14.8787 8.87868C14.3161 9.44129 14 10.2044 14 11C14 11.7956 14.3161 12.5587 14.8787 13.1213C15.4413 13.6839 16.2044 14 17 14H18V15C18 15.2652 17.8946 15.5196 17.7071 15.7071C17.5196 15.8946 17.2652 16 17 16H3C2.73478 16 2.48043 15.8946 2.29289 15.7071C2.10536 15.5196 2 15.2652 2 15V5.83C2.32127 5.94302 2.65943 6.00051 3 6H17C17.2652 6 17.5196 6.10536 17.7071 6.29289C17.8946 6.48043 18 6.73478 18 7V8Z" fill="white"/>
          </svg>
          <span>Connect Wallet</span>
        </div>
        <Identicoin class="wallet-avatar" v-else />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import Logo from '@/assets/logo.svg'
import Logo2 from '@/assets/logo2.svg'
import appConfig from '../../state/config'
import { computed } from 'vue'
import { drive } from '@/state/mobileCheck'
import { account, connect } from '@/state/account'
import Identicoin from './Identicoin.vue'

const arrowConnect = false

const isMobile = computed(() => {
  return drive.isMobile
})

const currDomain = computed(() => {
  return account.currDomain
})

const pnsUrl = computed(() => {
  return appConfig.pnsUrl.toString() || '/'
})
</script>

<style lang="less" scoped>
  .page-header-a {
    height: 60px;
    width: 100vw;
    left: 0;
    top:0;
    position: fixed;
    z-index: 999;
    background:rgba(255,255,255,0.98);

    .page-with {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }

    .logo {
      width: 36px;
      height: 60px;
      position: relative;
      display: block;
      img {
        height: 36px;
        width: auto;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .logo-wap {
        display: none;
      }
      .logo-web {
        display: block;
      }
    }

    .header-right {
      .wallet-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        margin-top: 11px;
        cursor: pointer;
        box-shadow: 0 3px 6px rgb(0 0 0 / 8%);
      }

      .connect-wallet {
        height: 37px;
        display: inline-flex;
        border-radius: 37px;
        padding: 0 18px;
        font-weight: bold;
        margin: 10px 0;
        font-size: 14px;
        color: #0F0E0E;
        align-items: center;
        background: #f4f4f7;
        backdrop-filter: blur(10px);
        line-height: 37px;
        user-select: none;
        cursor: pointer;
        transition: background 0.3s cubic-bezier(0.23, 1, 0.32, 1), color 0.3s cubic-bezier(0.23, 1, 0.32, 1);

        svg {
          margin-right: 12px;
          path {
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            fill: #0F0E0E
          }
        }

        &:hover {
          background: #ececec;
          color: #0F0E0E;

          svg {
            path {
              fill: #0F0E0E!important;
            }
          }
        }
      }
    }

    &.mobile {
      .connect-wallet {
        background: rgba(153, 153, 153, 0.2);
        span {
          display: none;
        }
        svg {
          margin-right: 0;
        }
      }
    }
  }

  @media only screen and (max-width: 954px) {
    .page-header-a {
      background: none;
      position: absolute;

      .logo {
        .logo-wap {
          display: block;
        }
        .logo-web {
          display: none;
        }
      }
    }

    .connect-wallet {
      svg path {
        fill: #fff!important;
      }
    }
  }
</style>
