<template>
  <div id="POAP" v-if="props.poapList.length">
    <div class="title">
      <div class="left">
        <span class="text">POAP</span>
        <span class="count"> {{ props.poapList.length }}</span>
      </div>
      <div class="right">
        <span class="handel" :class="{ active }" @click="active = !active">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.9999 1.16994C10.8126 0.983692 10.5591 0.87915 10.2949 0.87915C10.0308 0.87915 9.77731 0.983692 9.58995 1.16994L5.99995 4.70994L2.45995 1.16994C2.27259 0.983692 2.01913 0.87915 1.75495 0.87915C1.49076 0.87915 1.23731 0.983692 1.04995 1.16994C0.95622 1.26291 0.881826 1.37351 0.831057 1.49537C0.780288 1.61723 0.75415 1.74793 0.75415 1.87994C0.75415 2.01195 0.780288 2.14266 0.831057 2.26452C0.881826 2.38638 0.95622 2.49698 1.04995 2.58994L5.28995 6.82994C5.38291 6.92367 5.49351 6.99806 5.61537 7.04883C5.73723 7.0996 5.86794 7.12574 5.99995 7.12574C6.13196 7.12574 6.26267 7.0996 6.38453 7.04883C6.50638 6.99806 6.61699 6.92367 6.70995 6.82994L10.9999 2.58994C11.0937 2.49698 11.1681 2.38638 11.2188 2.26452C11.2696 2.14266 11.2957 2.01195 11.2957 1.87994C11.2957 1.74793 11.2696 1.61723 11.2188 1.49537C11.1681 1.37351 11.0937 1.26291 10.9999 1.16994Z"
                  fill="#010008" />
          </svg>
        </span>
        <EditBtn v-if="account.editable" @click="showWindow('EditPOAP', {title:'My POAP', data: poapList})" class="edit" />
      </div>
    </div>
    <div class="content" :class="{ active }">
      <a class="poap-item"
         v-for="item in props.poapList"
         :key="item.id"
         :href="item.url"
         target="_blank"
         :title="item.title">
        <div class="img">
          <Thumbnail :image="item.image" :title="item.title" :error-text="false"></Thumbnail>
        </div>
      </a>
    </div>
    <div class="content2" :class="{ active }">
      <a class="poap-item-2"
         v-for="item in props.poapList"
         :key="item.id"
         :href="item.url"
         target="_blank"
         :title="item.title">
        <div class="title">
          <div class="img">
            <Thumbnail :image="item.image" :title="item.title" :error-text="false"></Thumbnail>
          </div>
          <div class="tit">{{ item.title }}</div>
        </div>
        <div class="time">{{ item.published_at }}</div>
        <div class="text">{{ item.content }}</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditBtn from '@/components/EditBtn/MainEntry.vue'
import Thumbnail from '@/components/Thumbnail/MainEntry.vue'
import { computed, ref } from 'vue'
import { account } from '@/state/account'
import { showWindow } from '@/state/editWindows'

const props = defineProps<{poapList: Global.Poap[]}>()

const active = ref(false)

const contentHeight = computed(() => {
  return Math.ceil(props.poapList.length / 5) * 73 + 'px'
})
</script>

<style lang="less" scoped>
#POAP {
  margin-top: 20px;
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
  }

  .poap-item {
    display: flex;
    flex-flow: row nowrap;
    margin-top: 16px;
    height: 57px;
    width: 57px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 13px;

    .img {
      height: 57px;
      width: 57px;
    }
  }

  .content {
    overflow: hidden;
    transition: height 0.3s;
    display: flex;
    flex-flow: row wrap;
    align-content: baseline;

    &.active {
      display: none;
    }
  }

  .content2 {
    background: #F9F9FC;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 20px 20px 20px;
    overflow: hidden;
    flex-flow: column;
    display: none;
    margin-top: 14px;

    &.active {
      display: flex;
    }

    .poap-item-2 {
      margin-top: 20px;

      .title {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #010008;

        .img {
          min-height: 57px;
          min-width: 57px;
          max-width: 57px;
          max-height: 57px;
          height: 57px;
          width: 57px;
          margin-right: 10px;
          border-radius: 50%;
          overflow: hidden;
        }
        .tit {
          flex: 1;
        }
      }

      .time {
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #89899A;
        margin: 6px 0;
      }

      .text {
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #89899A;
      }
    }
  }
}

@media only screen and (max-width: 954px) {
  #POAP {
    width: 100vw;
    max-width: 388px;
    padding: 0 25px;

    .poap-item:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
