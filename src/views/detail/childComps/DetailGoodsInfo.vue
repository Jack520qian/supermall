<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start" style="float:left">
        <i class="dot" ></i>
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end" style="float:right">
        <i class="dot" ></i>
      </div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img :src="item" v-for="(item,index) in detailInfo.detailImage[0].list" :key="(item.value,index.value)" @load="imgLoad">
    </div>
  </div>
</template>
<script>
export default {
  name:"DetailGoodsInfo",
  props:{
    detailInfo:{
      type:Object
    }
  },
  data(){
    return  {
      counter:0,
      imagesLength:0
    }
  },
  methods:{
    imgLoad(){
      // 判断，所有的图片都加载完了，那么进行一次回调就可以了
      // if(++this.counter === this.imagesLength){
        this.$emit('imgLoad')
      // }
    }
  },
  watch:{
    detailInfo(){
      // 获取图片的个数
      this.imagesLength  = this.detailInfo.detailImage[0].list.length
    }
  }  
}
</script>
<style scoped>
  .goods-info{
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: .42rem .34rem;
    overflow: hidden;
  }

  .desc {
    padding: 0.85rem 0;
    text-indent: 26px;
    margin: 17px 0;
    color: gray;
  }

  .start,.end{
    width: 3.5rem;
    height: 0.04rem;
    background-color: gray;
    position: relative;
  }

  .dot {
    width: .21rem;
    height: .21rem;
    background-color: black;
    position: absolute;
    border-radius: 50%;
    top: -1px;
  }

  .info-key {
    padding: .42rem .34rem;
  }

  .info-list img {
    vertical-align: middle;
    width: 100%;
  }
</style>