<template>
  <div class="header">
    <div class="user">
      <img src="~assets/logo.jpg" alt="">
      <p class="userName">teenager</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>
  .header {
    height: 200px;
    background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    position: relative;
  }

  .user {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
  }

  .user img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .user p {
    margin-top: 6px;
  }
</style>
