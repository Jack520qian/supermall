<template>
  <div class="other">
    <div>待付款 <span> > </span></div>
    <div>待发货 <span> > </span></div>
    <div>待收货 <span> > </span></div>
  </div>
</template>

<script>
  export default {
    name: "other"
  }
</script>

<style scoped>
  .other {
    text-align: center;
    line-height: 50px;
    background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    position: relative;
    margin: 0 auto;
    color: #fff;
    font-weight: bold;
    height: 220px;
  }

  .other span {
    position: absolute;
    right: 50px;
  }

  .other_item {
    position: absolute;
    bottom: -65px;
    color: gray;
    left: 152px;

  }
</style>
