<template>
  <PageLoading v-if="loading"></PageLoading>
  <LayoutA v-else>
    <div class="main-contain" :class="{mobile: isMobile}">
      <div class="contain-row">
        <div class="avatar">
          <AvatarNft :nft-list="homeData.avatars"></AvatarNft>
        </div>
        <div class="contains">
          <BaseInfo :detail="domainDetail" />
        </div>
      </div>
    </div>
    <component :is="EditFrame" />
  </LayoutA>
</template>

<script lang="ts" setup>
import LayoutA from '@/layouts/LayoutA.vue'
import PageLoading from '@/components/PageLoading/MainEntry.vue'
import { computed, defineAsyncComponent, ref } from 'vue'
import { drive } from '@/state/mobileCheck'
import AvatarNft from './components/AvatarNFT/MainEntry.vue'
import BaseInfo from './components/BaseInfo/MainEntry.vue'
import axios from '@/plugins/axios'
import { getDomainDetails, setup } from 'pns-sdk'
import { useRoute } from 'vue-router'

const EditFrame = defineAsyncComponent(() => import('@/components/EditFrame/MainEntry.vue'))

const loading = ref(true)

const $route = useRoute()

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
  const res = await axios.get('/api/homes/all')
  homeData.value = res.data
  console.log('homeData', res.data)
}

const domainDetail = ref<Global.DomainDetail>({
  addrs: '',
  cname: '',
  content: '',
  contentType: '',
  label: '',
  name: '',
  owner: '',
  textRecords: []
})

const getDomainDetail = async () => {
  await setup()
  const res: any = await getDomainDetails(currDomain.value)
  domainDetail.value = res
  console.log('domainDetail', res)
}

const getData = async () => {
  Promise.all([getHomeData(), getDomainDetail()])
    .then(() => {
      loading.value = false
    })
    .catch(e => console.log(e))
    .finally(() => {
      loading.value = false
    })
}

getData()
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
