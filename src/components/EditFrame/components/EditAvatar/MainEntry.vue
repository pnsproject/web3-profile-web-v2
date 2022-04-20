<template>
  <div id="EditAvatar">
    <div class="nft-list">
      <div class="nft-item" v-for="(item, index) in NftList" :key="item.id">
        <div class="mark">{{ index }}</div>
        <Thumbnail :image="item.image" title="" :error-text="false"></Thumbnail>
      </div>
    </div>
    <div class="footer">
      <div class="result">
        <div class="nft-item"
             @click="deleteResult(item.id) "
             v-for="item in editResult"
             :key="item.id">
          <div class="mark">
            <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="8" height="2" rx="1" fill="white" />
            </svg>
          </div>
          <Thumbnail :image="item.image_url" title="" :error-text="false"></Thumbnail>
        </div>
      </div>
      <div class="btn-group">
        <Button :width="124" class="cancel-btn" @click="$emit('cancel')">Cancel</Button>
        <Button :width="190" :loading="loading" type="primary" class="safe-btn">Save</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Thumbnail from '@/components/Thumbnail/MainEntry.vue'
import Button from '@/components/Button/MainEntry.vue'
import { editWindows } from '@/state/editWindows'
import { ref } from 'vue'

const emit = defineEmits(['cancel'])

const editResult = ref(editWindows.option.data)

const NftList = [
  {
    id: 123,
    image: 'https://static.nftgo.io/asset/metadata/9c5a67e4bff73fcf2f6be8cdcd2a4de1.png'
  },
  {
    id: 124,
    image: 'https://byterum.mypinata.cloud/ipfs/Qmb4VB12RsXW6DaKranEdgnMUTzfyVBEb5eZ1v7JCEUxL1/'
  },
  {
    id: 125,
    image: 'https://tpc.googlesyndication.com/simgad/4152085755011562435?sqp=4sqPyQQrQikqJwhfEAEdAAC0QiABKAEwCTgDQPCTCUgAUAFYAWBfcAJ4AcUBLbKdPg&rs=AOga4qnkmPRZL3O36fhq7GiMEaImz83g7g'
  },
  {
    id: 126,
    image: 'https://s.cn.bing.net/th?id=OIP-C.XwJiMLu0DpoxS0xn74vDiAHaLG&w=204&h=305&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
  },
  {
    id: 126,
    image: 'https://s.cn.bing.net/th?id=OIP-C.XwJiMLu0DpoxS0xn74vDiAHaLG&w=204&h=305&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
  }
]

const loading = ref(true)

const deleteResult = (deleteId: number) => {
  editResult.value = editResult.value.filter((item: Global.NftThum) => {
    return item.id !== deleteId
  })
}
</script>

<style lang="less" scoped>
#EditAvatar {
  width: 945px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  overflow: hidden;

  .nft-list {
    min-width: 490px;
    max-width: 490px;
    display: flex;
    flex-flow: row wrap;
    margin-right: 35px;
    overflow: auto;
    max-height: calc(100vh  - 100px);
    align-content: flex-start;
    background: #F9F9FC;
    border-radius: 12px;
    padding: 20px;
    box-sizing: border-box;
  }

  .footer {
    position: relative;
    max-height: calc(100vh  - 100px);
    display: flex;
    flex-flow: column nowrap;
    justify-content: end;
    flex: 1;
    width: 410px;
    background: #fff;
    bottom: 0;
    left: 0;

    .result {
      display: flex;
      flex-flow: row nowrap;
      margin-bottom: 25px;
      .nft-item {
        width: calc((410px - 40px) / 5);
        height: calc((410px - 40px) / 5);
        margin-right: 10px;

        .mark {
          width: 14px;
          height: 14px;
          line-height: 5px;
          right: 3px;
          top: 3px;
        }
      }
    }

    .btn-group {
      text-align: center;
      .cancel-btn {
        margin-right: 10px;
      }
    }
  }

  .nft-item {
    width: calc((480px - 50px) / 3);
    height: calc((480px - 50px) / 3);
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    &:nth-child(3n) {
      margin-right: 0;
    }

    .mark {
      width: 30px;
      height: 30px;
      background: #E5507E;
      color: #fff;
      font-size: 18px;
      text-align: center;
      line-height: 30px;
      position: absolute;
      right: 8px;
      top: 8px;
      z-index: 2;
      border-radius: 50%;
    }
  }
}

@media only screen and (max-width: 954px) {
  #EditAvatar {
    width: 388px;
    display: block;
    height: calc(100vh  - 60px);
    padding: 0 25px;
    box-sizing: border-box;

    .footer {
      width: 338px;
      height: 160px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      .btn-group {
        margin-bottom: 26px;
      }

      .result {
        display: flex;
        flex-flow: nowrap;
        .nft-item {
          width: calc((338px - 40px) / 5);
          height: calc((338px - 40px) / 5);
        }
      }
    }

    .nft-list {
      width: 100%;
      margin-right: 0;
      min-width: inherit;
      background: #fff;
      border-radius: 0;
      padding: 0;
      padding-bottom: 160px;
    }

    .nft-item {
      width: calc((388px - 70px) / 3);
      height: calc((388px - 70px) / 3);
    }
  }
}
</style>
