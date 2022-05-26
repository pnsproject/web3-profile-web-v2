<template>
  <div class="copy-test">
    <span v-if="showText">{{ props.text }}</span>
    <i class="copy-btn" @click="copy">
      <svg :class="{active: !copied}"  t="1645500698840" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12003" width="18" height="18"><path d="M896 381.44a55.893333 55.893333 0 0 0-2.56-11.52v-3.84a45.653333 45.653333 0 0 0-8.106667-11.946667l-256-256a45.653333 45.653333 0 0 0-11.946666-8.106666 13.653333 13.653333 0 0 0-3.84 0 37.546667 37.546667 0 0 0-14.08-4.693334H426.666667a128 128 0 0 0-128 128v42.666667H256a128 128 0 0 0-128 128v426.666667a128 128 0 0 0 128 128h341.333333a128 128 0 0 0 128-128v-42.666667h42.666667a128 128 0 0 0 128-128V384v-2.56z m-256-150.613333L750.506667 341.333333H682.666667a42.666667 42.666667 0 0 1-42.666667-42.666666zM640 810.666667a42.666667 42.666667 0 0 1-42.666667 42.666666H256a42.666667 42.666667 0 0 1-42.666667-42.666666V384a42.666667 42.666667 0 0 1 42.666667-42.666667h42.666667v298.666667a128 128 0 0 0 128 128h213.333333z m170.666667-170.666667a42.666667 42.666667 0 0 1-42.666667 42.666667h-341.333333a42.666667 42.666667 0 0 1-42.666667-42.666667V213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h128v128a128 128 0 0 0 128 128h128z" p-id="12004" fill="#a2a1ad"></path></svg>
      <svg :class="{active: copied}"  t="1645513612642" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14728" width="18" height="18"><path d="M722.112 360.544c15.456 15.456 15.456 39.744 0 55.232L474.784 663.712a39.687 39.687 0 0 1-55.232 0l-1.92-2.24-115.68-116.224c-15.456-14.88-15.456-39.488-0.544-54.656s39.744-15.2 54.656 0l91.104 90.816 219.776-220.832c15.456-15.168 40-15.168 55.2 0zM906.72 512c0 218.016-176.736 394.72-394.72 394.72S117.28 730.016 117.28 512 294.016 117.28 512 117.28c218.016 0 394.752 176.736 394.752 394.72z m-73.088 0c0-177.632-144-321.632-321.664-321.632s-321.6 144-321.6 321.632 143.968 321.632 321.6 321.632 321.664-144 321.664-321.632z" p-id="14729" fill="#d4237a"></path></svg>
    </i>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useMessage from '@/plugins/useMessage'

const props = withDefaults(defineProps<{text: string, showText?: boolean }>(), { text: '', showText: true })

const copied = ref(false)

const copy = () => {
  const oInput = document.createElement('input')
  oInput.value = props.text
  document.body.appendChild(oInput)
  oInput.select()
  document.execCommand('Copy')
  oInput.id = 'oInput'
  oInput.style.display = 'none'
  document.querySelector('#oInput')?.remove()
  copied.value = true
  useMessage('info', 'Coped!', '📋')
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style lang="less" scoped>
  .copy-test {
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 18px;

    .copy-btn {
      width: 18px;
      height: 18px;
      cursor: pointer;
      position: relative;

      svg {
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.2s ease-in-out;

        &.active {
          opacity: 1;
        }
      }
    }
  }
</style>
