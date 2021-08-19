<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="(item.value,index.value)" :goods-item="item"/>
        <!-- {{goods}} -->
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem.vue"

export default {
  name:"GoodsList",
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>
<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    /* padding: 2px; */
  }
</style>