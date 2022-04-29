<template>
  <div id="BaseInfo">
    <div class="domain">{{ props.detail.name }}</div>
    <div class="des" v-if="notice">{{ notice.value }}</div>
    <div class="domain-owner">
      <a v-if="twitter" class="twitter" :href="twitter.value" target="_blank">
        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.16262 15.3125C12.9534 15.3125 16.6687 9.68509 16.6687 4.80646C16.6687 4.64825 16.6652 4.48653 16.6582 4.32833C17.3809 3.80566 18.0046 3.15825 18.5 2.41653C17.8269 2.71601 17.1122 2.9116 16.3804 2.99661C17.151 2.53474 17.7279 1.80917 18.0043 0.954386C17.2794 1.38398 16.4867 1.68702 15.6601 1.85052C15.1031 1.25873 14.3667 0.866898 13.5648 0.735599C12.7628 0.6043 11.9399 0.740849 11.2233 1.12413C10.5067 1.50742 9.93635 2.11609 9.60039 2.85604C9.26442 3.596 9.18157 4.42602 9.36465 5.21778C7.89687 5.14413 6.46095 4.76284 5.14999 4.09863C3.83902 3.43443 2.68227 2.50214 1.75473 1.3622C1.2833 2.17499 1.13904 3.1368 1.35127 4.05213C1.5635 4.96746 2.1163 5.76765 2.8973 6.29005C2.31097 6.27144 1.73748 6.11357 1.22422 5.8295V5.87521C1.22369 6.72817 1.51857 7.555 2.05873 8.21514C2.59889 8.87528 3.35099 9.32798 4.18719 9.4963C3.64404 9.64491 3.07399 9.66656 2.52113 9.55958C2.75709 10.2931 3.21618 10.9347 3.83433 11.3948C4.45248 11.8549 5.19884 12.1105 5.96926 12.126C4.66132 13.1534 3.04563 13.7107 1.38242 13.708C1.08747 13.7076 0.792799 13.6895 0.5 13.6539C2.18964 14.7379 4.15515 15.3136 6.16262 15.3125Z" fill="white"/>
        </svg>
        <span>@{{ props.detail.label }}</span>
      </a>
      <div class="wallet" :class="{single: !twitter}">
        <span>{{ shotWallet }}</span>
        <CopyText :text="props.detail.owner" :show-text="false" />
      </div>
    </div>
    <div v-if="props.detail.textRecords" class="media-list">
      <SocialMedia
        v-for="item in socialList"
        :key="item.key"
        class="media-item"
        :type="item.key"
        :url="item.value" />
      <SocialMedia @click.prevent="showShare=true" type="Share" url="#" class="media-item" />
      <EditBtn v-if="account.editable" class="edit" @click="gotoEdit"></EditBtn>
    </div>
  </div>
  <SharePage v-model:show="showShare" />
</template>

<script lang="ts" setup>
import CopyText from '@/components/CopyText/MainEntry.vue'
import EditBtn from '@/components/EditBtn/MainEntry.vue'
import SocialMedia from './components/SocialMedia.vue'
import SharePage from './components/SharePage.vue'
import { computed, ref } from 'vue'
import { account } from '@/state/account'

const props = defineProps<{detail: Global.DomainDetail}>()

const showShare = ref(false)

const shotWallet = computed(() => {
  if (!props.detail || !props.detail.owner) return ''
  return props.detail.owner.substring(0, 5) + '...' + props.detail.owner.substring(38)
})

const socialList = computed(() => {
  return props.detail.textRecords.filter(item => {
    return (item.key === 'com.github' || item.key === 'email') && item.value
  })
})

const notice = computed(() => {
  return props.detail.textRecords.find(item => {
    return item.key === 'notice' && item.value
  })
})

const twitter = computed(() => {
  return props.detail.textRecords.find(item => {
    return item.key === 'com.twitter' && item.value
  })
})

const gotoEdit = () => {
  window.open(`https://test.pns.link/details/${props.detail.name}`, '_blank')
}

</script>

<style lang="less" scoped>
#BaseInfo {
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  align-items: flex-start;

  .domain {
    font-weight: 600;
    font-size: 46px;
    line-height: 63px;
    color: #010008;
    margin-bottom: 10px;
  }

  .des {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #010008;
    margin-bottom: 20px;
  }

  .domain-owner {
    position: relative;
    display: inline-flex;
    flex-flow: row nowrap;
    margin-bottom: 20px;

    .single {
      transform: translateX(0px)!important;
    }

    .twitter {
      padding: 0 26px 0 12px;
      height: 32px;
      line-height: 32px;
      border-radius: 32px;
      background: #1D9BF0;
      color: #fff;
      display: inline-flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

      svg {
        margin-right: 4px;
      }
    }

    .wallet {
      .twitter;
      padding: 0 12px;
      background: #fff;
      color: #89899A;
      transform: translateX(-22px);

      span {
        margin-right: 8px;
      }
    }
  }

  .media-list {
    display: flex;
    width: 100%;
    position: relative;
    flex-flow: row nowrap;
    padding: 4px 0;

    .edit {
      position: absolute;
      right: 0;
    }

    .media-item {
      margin: 0 9px;
    }
  }
}

@media only screen and (max-width: 954px) {
  #BaseInfo {
    width: 100vw;
    max-width: 388px;
    padding: 0 25px;
    text-align: left;
    align-items: center;
    box-sizing: border-box;

    .domain {
      font-size: 24px;
      line-height: 27px;
    }
    .des {
      width: 210px;
      text-align: center;
    }

    .domain-owner {
      .twitter {
        transform: translateX(11px);
      }
      .wallet {
        transform: translateX(-11px);
      }
    }

    .media-list {
      justify-content: center;
    }
  }
}
</style>
