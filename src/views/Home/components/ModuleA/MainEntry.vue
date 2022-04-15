<template>
  <div class="module-a">
    <div class="page-with">
      <img class="head-pic" :src="props.avatar" :alt="props.currDomain" v-if="avatar">
      <img class="head-pic" :src="defaultAvatar" :alt="props.currDomain" v-else>
      <h1 class="domain">{{ props.currDomain }}</h1>
      <SocialMediaList :domainInfo="props.domainInfo"></SocialMediaList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SocialMediaList from '@/components/SocialMediaList/MainEntry.vue'
import { DomainDetails } from 'pns-sdk'
import defaultAvatar from '@/assets/default_avatar.png'
import { ref } from 'vue'
import config from '../../../../state/config'

interface Props {
  currDomain: string;
  domainInfo: DomainDetails;
  avatar: string
}

const props = defineProps<Props>()

const avatar = ref('')

const preload = () => {
  const img = new Image()
  const src = config.ipfsGateway + props.avatar.split('ipfs//')[1]
  img.src = props.avatar
  img.onload = () => {
    avatar.value = props.avatar
  }
}

preload()
</script>

<style lang="less" scoped>
.module-a {
  margin-top: 231px;
  background: #fff;
  position: relative;
  z-index: 2;
  margin-bottom: 60px;

  .head-pic {
    width: 174px;
    height: 174px;
    position: absolute;
    border-radius: 50%;
    margin-top: -135px;
  }

  .domain {
    font-size: 48px;
    line-height: 58px;
    color: #000000;
    padding-top: 60px;
  }
}

@media only screen and (max-width: 768px) {
  .module-a  {
    margin-top: 220px;

    .head-pic {
      left: 50%;
      transform: translatex(-50%);
    }

    .domain {
      text-align: center;
      font-size: 34px;
    }
  }
}
</style>
