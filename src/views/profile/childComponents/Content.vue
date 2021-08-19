<template>
  <div class="content">
    <div class="content_item">收获地址管理 <span> > </span></div>
    <div class="content_item">意见反馈 <span> > </span></div>
    <div class="content_item">常见问题 <span> > </span></div>
  </div>
</template>

<script>
  export default {
    name: "Content"
  }
</script>

<style scoped>
  .content {
    height: 150px;
    text-align: center;
    background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    font-size: 14px;
    color: #ffffff;
    font-weight: bold;
  }

  .content_item {
    height: 50px;
    line-height: 50px;
    position: relative;
  }

  .content_item span {
    position: absolute;
    right: 50px;
  }
</style>
