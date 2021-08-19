<template>
  <div class="right">
    <div class="right-list">
      <div class="right-list-item" v-for="(item,index) in rightList">
        <img :src="item.image" alt="" @load="imgLoad">
        <div>{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RightContent",
    props: {
      rightList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imgLoad() {
        this.$emit('imgLoad')
      }
    }
  }
</script>

<style scoped>
  .right-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .right-list-item {
    /*flex: 1;*/
    border-radius: 50%;
    flex: 30%;
    text-align: center;
    margin-top: 8px;
    font-size: 13px;
  }

  .right-list-item img {
    width: 50px;
    border-radius: 50%;
    margin-bottom: 6px;
  }
</style>
