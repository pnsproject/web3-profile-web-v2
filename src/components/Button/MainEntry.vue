<template>
  <div class="button" :class="[props.type, {disable: props.disable, loading: props.loading}]"
  :style="{ width: props.width ? props.width + 'px' : 'auto' }">
    <div class="btn-content">
      <slot />
    </div>
    <svg version="1.1" class="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
      <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
        <animateTransform attributeType="xml" attributeName="transform"  type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
</template>

<script lang="ts" setup>
export type ButtonType = '' | 'primary' | 'info' | 'success'

interface Props {
  type?: ButtonType;
  disable?: boolean;
  loading?: boolean;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: '',
  disable: false,
  loading: false,
  width: 0
})
</script>

<style lang="less" scoped>
.button {
  height: 36px;
  border-radius: 10px;
  color: #0F0E2E;
  font-size: 18px;
  position: relative;
  background: #F3F3F7;
  cursor: pointer;
  user-select: none;
  text-align: center;
  padding: 8px 18px;
  box-sizing: border-box;
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;

  .loader{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: none;
    path {
      fill: #b5b5b5;
    }
  }

  .btn-content {
    height: 20px;
  }

  &.primary {
    background: #E5507E;
    color: #fff;

    .loader {
      path {
        fill: #fff;
      }
    }
  }

  /** status **/
  &.disable {
    pointer-events: none;
  }

  &.loading {
    pointer-events: none;
    .btn-content {
      opacity: 0;
    }
    .loader{
      display: block;
    }
  }
}
</style>
