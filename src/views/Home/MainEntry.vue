<template>
  <LayoutA v-if="loading">
    <div class="main-contain" :class="{mobile: isMobile}">
      <div class="contain-row">
        <div class="avatar">
          <AvatarLoading />
        </div>
        <div class="contains">
          <ContentLoading></ContentLoading>
          <ContentLoading></ContentLoading>
          <ContentLoading></ContentLoading>
        </div>
      </div>
    </div>
  </LayoutA>

  <LayoutA v-else>
    <div class="main-contain" :class="{mobile: isMobile}">
      <div class="contain-row">
        <div class="avatar">
          <AvatarNft v-if="homeData.avatars.length" :nft-list="homeData.avatars" ></AvatarNft>
          <UserDefaultAvatar v-else id="UserDefaultAvatar" :domain="currDomain"></UserDefaultAvatar>
        </div>
        <div class="contains">
          <BaseInfo :detail="domainDetail" />
          <WalletAddress :address="domainDetail.addrs" />
          <App :app-list="homeData.apps"/>
          <Poap :poap-list="homeData.poaps"/>
          <GalaxCredentials :galaxy-credentials-list="homeData.galaxy_credentials"/>
          <Domains :domains-list="homeData.domains"/>
          <Collections :collections-list="homeData.collections"/>
          <MirrorBlog :blog-list="homeData.mirror_blogs" />
        </div>
      </div>
    </div>
    <component :is="EditFrame" />
    <NftDetail />
  </LayoutA>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import LayoutA from '@/layouts/LayoutA.vue'
import { drive } from '@/state/mobileCheck'
import AvatarNft from './components/AvatarNFT/MainEntry.vue'
import BaseInfo from './components/BaseInfo/MainEntry.vue'
import WalletAddress from './components/WalletAddress/MainEntry.vue'
import App from './components/App/MainEntry.vue'
import Poap from './components/Poap/MainEntry.vue'
import GalaxCredentials from './components/GalaxCredentials/MainEntry.vue'
import Domains from './components/Domains/MainEntry.vue'
import Collections from './components/Collections/MainEntry.vue'
import MirrorBlog from './components/MirrorBlog/MainEntry.vue'
import AvatarLoading from '@/components/PageLoadingV2/AvatarLoading.vue'
import ContentLoading from '@/components/PageLoadingV2/ContentLoading.vue'
import UserDefaultAvatar from '@/components/UserDefaultAvatar/MainEntry.vue'
import NftDetail from '@/components/NftDetail/MainEntry.vue'
import axios from '@/plugins/axios'
import { getDomainDetails, setup, getDomains } from 'pns-sdk'
import { useRoute, useRouter } from 'vue-router'
import { switchChain, setOwner, account } from '@/state/account'
import useMessage from '@/plugins/useMessage'
import { ethers } from 'ethers'
import appConfig, { PnsChainId } from '@/state/config'

const EditFrame = defineAsyncComponent(() => import('@/components/EditFrame/MainEntry.vue'))

const loading = ref(true)

const $route = useRoute()

const $router = useRouter()

const rpc = appConfig.chains[appConfig.pnsChainId as PnsChainId].rpcUrls[0]

const provider: any = new ethers.providers.StaticJsonRpcProvider(rpc)

const currDomain = computed(function ():string {
  return account.currDomain
})

const isMobile = computed(() => {
  return drive.isMobile
})

const homeData = ref<Global.HomeData>({
  apps: [],
  avatars: [],
  collections: [],
  domains: [],
  galaxy_credentials: [],
  mirror_blogs: [],
  poaps: []
})

/**
 * 设置title
 */
document.title = `${currDomain.value.replace('.dot', '')}-Web3Profile`

/**
 * 获取nft列表
 */
const getHomeData = async () => {
  const res = await axios.get(`/api/homes/all?eth_address=${account.domainOwner}`)
  if (res.data.message === 'account not exist') {
    $router.push('/notfound')
    throw new Error('account not found')
  }

  homeData.value = res.data.result
  console.log('homeData', res.data.result)
}

const domainDetail = ref<Global.DomainDetail>({
  addrs: [],
  cname: '',
  content: '',
  contentType: '',
  label: '',
  name: '',
  owner: '',
  textRecords: []
})

/**
 * 获取域名信息
 */
const getDomainDetail = async () => {
  const res: any = await getDomainDetails(currDomain.value)
  domainDetail.value = res
  console.log('domainDetail', res)
  if (res.owner === '0x0000000000000000000000000000000000000000') {
    $router.push('/notfound')
    throw new Error('account not found')
  }

  setOwner(res.owner)
}

/**
 * 获取域名拥有者所有pns域名
 */
const getPnsDomain = async () => {
  const res: Global.PnsDomainItem[] = await getDomains(account.domainOwner)
  const toDomain: Global.DomainItem[] = res.map((item) => {
    return {
      id: item.id,
      name: item.name
    }
  })

  homeData.value.domains = [...toDomain, ...homeData.value.domains]
}

/**
 * 加载数据
 */
const getData = async () => {
  await setup(provider)
  try {
    await getDomainDetail()
    await getHomeData()
    await getPnsDomain()
    loading.value = false
  } catch (e:any) {
    if (e.message !== 'account not found') {
      useMessage('error', 'An error occurred, please try again later.', '🤕')
    }
    console.log(e)
  }
}

watch(currDomain, (val) => {
  getData()
}, { immediate: true })
</script>

<style lang="less" scoped>
  .main-contain {
    width: 100%;
    padding-top: 10px;

    .contain-row {
      width: 954px;
      display: flex;
      flex-flow: row nowrap;
      margin: 0 auto;
      justify-content: flex-end;
    }

    .avatar {
      width: 388px;
      margin-right: 43px;
      position: fixed;
      left: calc(50vw - 478px);
    }

    .contains {
      width: 526px;
    }

    &.mobile {
      padding-top: 0;
      .contain-row {
        width: 100%;
        max-width: 388px;
        display: flex;
        flex-flow: column wrap;

        .avatar {
          width: 100%;
          position: relative;
          margin-right: 0;
          left: inherit;
        }

        .contains {
          width: 100%;
        }
      }
    }
  }

  #UserDefaultAvatar {
    margin-bottom: 20px;
  }
</style>
