<template>
  <LayoutA v-if="true">
    <div class="main-contain" :class="{mobile: isMobile}">
      <div class="contain-row">
        <div class="avatar">
          <UserDefaultAvatar :domain="'asdasdasdasdasd.dot'"></UserDefaultAvatar>
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
          <AvatarNft :nft-list="homeData.avatars"></AvatarNft>
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
import axios from '@/plugins/axios'
import { getDomainDetails, setup } from 'pns-sdk'
import { useRoute, useRouter } from 'vue-router'
import { switchChain, setDomainInfo, account } from '@/state/account'
import useMessage from '@/plugins/useMessage'

const EditFrame = defineAsyncComponent(() => import('@/components/EditFrame/MainEntry.vue'))

const loading = ref(true)

const $route = useRoute()

const $router = useRouter()

const currDomain = computed(function ():string {
  // return document.domain
  const query = $route.query.name
  if (query) {
    if (Array.isArray(query) && query[0]) {
      return query[0].toString()
    } else {
      return query as string
    }
  }

  return 'zoufangda01.dot'
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

const getHomeData = async () => {
  const res = await axios.get(`/api/homes/all?eth_address=${account.domainOwner}`)
  if (res.data.message === 'account not exist') {
    // $router.push('/notfound')
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

const getDomainDetail = async () => {
  await switchChain()
  await setup()
  const res: any = await getDomainDetails(currDomain.value)
  domainDetail.value = res
  console.log('domainDetail', res)
  setDomainInfo(currDomain.value, res.owner)
}

const getData = async () => {
  try {
    await getDomainDetail()
    await getHomeData()
    loading.value = false
  } catch (e) {
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

    .contain-row {
      width: 954px;
      display: flex;
      flex-flow: row nowrap;
      margin: 0 auto;
      justify-content: right;
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
</style>
