<template>
  <div class="profile">
    <Header></Header>
    <Content></Content>
    <other></other>
  </div>
</template>

<script>
  import Header from "./childComponents/Header";
  import Content from "./childComponents/Content";
  import other from "./childComponents/other";

  export default {
    name: "Profile",
    components: {
      Header,
      Content,
      other
    }
  }
</script>

<style scoped>

</style>
