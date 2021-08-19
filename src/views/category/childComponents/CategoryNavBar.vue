<template>
  <div>
    <nav-bar class="nav">
      <div slot="center">
        商品分类
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "CategoryNavBar",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .nav {
    text-align: center;
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bold;
  }
</style>
