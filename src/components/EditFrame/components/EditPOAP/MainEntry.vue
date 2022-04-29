<template>
  <Loading v-if="loading" />
  <div v-else id="EditApp">
    <div class="listed">
      <div class="tit">Listed</div>
      <Draggable v-model="editResult" item-key="id" ghost-class="ghost" drag-class="drag" :animation="150">
        <template #item="{ element }">
          <div class="item">
            <div class="info">
              <div class="img">
                <Thumbnail :image="element.image" :title="element.title" :error-text="false"></Thumbnail>
              </div>
              <div class="name">{{ element.title }}</div>
            </div>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#EFEFF3"/>
              <rect x="6" y="14" width="18" height="3" rx="1.5" fill="white"/>
            </svg>
          </div>
        </template>
      </Draggable>
    </div>
    <div class="footer">
      <div class="tit">Unlisted</div>
      <div class="unlisted">
        <div v-for="item in editResult" :key="item.id" class="item" >
          <div class="info">
            <div class="img">
              <Thumbnail :image="item.image" :title="item.title" :error-text="false"></Thumbnail>
            </div>
            <div class="name">{{ item.title }}</div>
          </div>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="15" fill="#F9F9FC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 21C13.5 21.8284 14.1716 22.5 15 22.5C15.8284 22.5 16.5 21.8284 16.5 21V16.5H21C21.8284 16.5 22.5 15.8284 22.5 15C22.5 14.1716 21.8284 13.5 21 13.5H16.5V9C16.5 8.17157 15.8284 7.5 15 7.5C14.1716 7.5 13.5 8.17157 13.5 9V13.5H9C8.17157 13.5 7.5 14.1716 7.5 15C7.5 15.8284 8.17157 16.5 9 16.5H13.5V21Z" fill="#D6D6DE"/>
          </svg>
        </div>
      </div>
      <div class="btn-group">
        <Button :width="124" class="cancel-btn" @click="$emit('cancel')">Cancel</Button>
        <Button :width="190" :loading="saving" type="primary" class="safe-btn">Save</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Loading from '@/components/contentLoading/MainEntry.vue'
import Button from '@/components/Button/MainEntry.vue'
import { ref } from 'vue'
import { editWindows } from '@/state/editWindows'
import Draggable from 'vuedraggable'
import Thumbnail from '@/components/Thumbnail/MainEntry.vue'

const emit = defineEmits(['cancel'])

const editResult = ref(editWindows.option.data)

const loading = ref(false)

const saving = ref(false)
</script>

<style lang="less" scoped>
#EditApp {
  width: 954px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  overflow: hidden;

  .item {
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
    box-sizing: border-box;

    .info {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }

    .name {
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      color: #000;
    }

    .img {
      display: block;
      height: 60px;
      width: 60px;
      border-radius: 50%;
      margin-right: 10px;
      overflow: hidden;
    }
  }

  .listed {
    margin-right: 35px;
    overflow: auto;
    max-height: calc(100vh  - 100px);
    align-content: flex-start;
    background: #F9F9FC;
    border-radius: 12px;
    box-sizing: border-box;
    width: 480px;

    .item {
      cursor: move;
      padding: 0 20px;
    }

    .tit {
      line-height: 44px;
      font-size: 16px;
      font-weight: 600;
      color: #010008;
      padding: 0 20px;
    }
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

    .tit {
      line-height: 44px;
      padding: 0 20px;
      font-size: 16px;
      color: #5A596E;
      font-weight: 600;
    }

    .unlisted {
      margin-bottom: 25px;
      height: 100%;
      padding: 0 20px;
      overflow: auto;
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
  #EditApp{
    width: 388px;
    display: block;
    height: calc(100vh  - 60px);
    padding: 0 25px;
    box-sizing: border-box;

    .footer {
      width: 338px;
      height: 344px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      .btn-group {
        margin-bottom: 26px;
      }

      .unlisted {
        padding: 0 20px;
        height: 300px;
        .nft-item {
          width: calc((338px - 40px) / 5);
          height: calc((338px - 40px) / 5);
        }
      }
    }

    .listed {
      width: 100%;
      height: calc(100% - 344px);
      margin-right: 0;
      min-width: inherit;
    }

    .nft-item {
      width: calc((388px - 70px) / 3);
      height: calc((388px - 70px) / 3);
    }
  }
}
</style>
