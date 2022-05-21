<template>
  <div class="edit-btn" v-if="false">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.045 5.265L9.735 5.955L2.94 12.75H2.25V12.06L9.045 5.265ZM11.745 0.75C11.5575 0.75 11.3625 0.825 11.22 0.9675L9.8475 2.34L12.66 5.1525L14.0325 3.78C14.325 3.4875 14.325 3.015 14.0325 2.7225L12.2775 0.9675C12.1275 0.8175 11.94 0.75 11.745 0.75ZM9.045 3.1425L0.75 11.4375V14.25H3.5625L11.8575 5.955L9.045 3.1425Z" fill="#BEBEBE"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
  .edit-btn {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: #FBFAFA;
    position: relative;
    cursor: pointer;

    svg {
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
