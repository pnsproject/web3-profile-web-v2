<template>
  <div v-if="props.nftList.length" id="AvatarNFT" :class="{'mobile': isMobile}">
    <div class="main">
      <Thumbnail
        :image="props.nftList[mainIndex].image_url"
        :error-text="true"
        title=""/>
    </div>
    <div class="sub">
      <div class="sub-nft"
           v-for="(item, index) in props.nftList"
           :class="{active: index === mainIndex}"
           :key="item.id">
        <Thumbnail
          :image="item.image_url"
          :error-text="false"
          title=""
          @click="switchMainNft(index)"
        />
      </div>
      <div v-if="account.editable" class="edit-btn" @click="showWindow('EditAvatar', {title:'My NFTs', data: props.nftList})">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.045 5.265L9.735 5.955L2.94 12.75H2.25V12.06L9.045 5.265ZM11.745 0.75C11.5575 0.75 11.3625 0.825 11.22 0.9675L9.8475 2.34L12.66 5.1525L14.0325 3.78C14.325 3.4875 14.325 3.015 14.0325 2.7225L12.2775 0.9675C12.1275 0.8175 11.94 0.75 11.745 0.75ZM9.045 3.1425L0.75 11.4375V14.25H3.5625L11.8575 5.955L9.045 3.1425Z" fill="#BEBEBE"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { drive } from '@/state/mobileCheck'
import { computed, ref } from 'vue'
import Thumbnail from '@/components/Thumbnail/MainEntry.vue'
import { showWindow } from '@/state/editWindows'
import { account } from '@/state/account'

const props = withDefaults(defineProps<{nftList: Array<Global.NftThum>}>(), { nftList: () => [] })

const isMobile = computed(() => {
  return drive.isMobile
})

const mainIndex = ref(0)

const switchMainNft = (index: number) => {
  mainIndex.value = index
  console.log(mainIndex.value)
}
</script>

<style lang="less" scoped>
#AvatarNFT {
  .main {
    width: 100vw;
    height: 100vw;
    max-width: 388px;
    max-height: 388px;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    background: #f1f1f1;

    img {
      min-height: 388px;
      min-width: 388px;
      position: absolute;
      display: block;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .sub {
    display: flex;
    flex-flow: nowrap;
    justify-content: center;
    transform: translateY(-50%);

    .sub-nft, .edit-btn {
      width: 50px;
      height: 50px;
      overflow: hidden;
      margin: 0 5px;
      position: relative;
      border-radius: 4px;
      background: #f1f1f1;
      cursor: pointer;
      box-sizing: border-box;

      img {
        min-height: 50px;
        min-width: 50px;
        position: absolute;
        display: block;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .sub-nft.active {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
      border: 2px solid #fff;
    }

    .edit-btn {
      svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  &.mobile {
    .main {
      border-radius: 0;
    }
  }
}
</style>
