<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad"></detail-goods-info>
      <detail-params :param-info="paramInfo" ref="params"></detail-params>
      <detail-comment :comment="comment" ref="comment"></detail-comment>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"></toast>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParams from "./childComps/DetailParams.vue"
import DetailComment from "./childComps/DetailComment.vue"
import DetailBottomBar from "./childComps/DetailBottomBar.vue"

import Scroll from "../../components/common/scroll/Scroll.vue"
import GoodsList from "../../components/content/goods/GoodsList.vue"
import Toast from "../../components/common/toast/Toast.vue"

import BackTop from "../../components/content/backTop/BackTop.vue"

import {getDetail , Goods , GoodsParam, Shop , getRecommend} from "../../network/detail"
import { deBounce } from '../../common/utils'

export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailComment,
    DetailBottomBar,

    Scroll,
    GoodsList,
    Toast,

    BackTop,
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      comment:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      isShowBackTop:false,
      message:'',
      show:false
    }
  },
  created(){
    // 1.保持传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      // console.log(res);
      const data = res.result
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo , data.columns , data.shopInfo.services)

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // console.log(this.paramInfo);

      // 6获取评论信息
      if (data.rate.cRate !== 0) {
        this.comment = data.rate.list[0];
      }

      /*
      // 第一次获取，值不对
      // 值不对的原因：this.$refs.params.$el压根没有渲染
      this.themeTopYs = []

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);

      this.$nextTick(() => {
        // 第二次获取，值不对
        // 值不对的原因：图片没有计算在内
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      })
      */
    })

    // 3.请求推荐数据
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })

    // 4.给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖）
    this.getThemeTopY = deBounce(() => {
      this.themeTopYs = []

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);


      // console.log(this.themeTopYs);
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],1000)
    },
    contentScroll(position){
      // console.log(position);

      // 1.获取y值
      const positionY = -position.y;

      // 2.positionY和主题中值进行对比
      // [0 , 7938 , 9120 , 9452]

      // positionY 在 0 到 7938 之间。index = 0
      // positionY 在 7938 到 9120 之间。index = 1
      // positionY 在 9120 到 9452 之间。index = 2
      
      // positionY 大于等于9452值 。index = 3
      let length = this.themeTopYs.length;

      // 普通做法
      /* for(let i = 0; i<length ; i++){
        if(this.currentIndex !== i &&((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.themeTopYs[i]))){
          // console.log(i);

          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      } */

      // 优化后的hack做法
      for(let i = 0; i<length - 1 ; i++){
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          
        }
      }

      // 3.是否显示回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
    backTop(){
      this.$refs.scroll.scroll.scrollTo(0,0,500);
    },
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      // this.$store.commit('addCart',product);
      this.$store.dispatch('addCart',product).then(res => {
        // console.log(res);
        this.show = true;
        this.message = res;

        setTimeout(() => {
          this.show = false;
          this.message = '';
        },1500)
      });
    }
  }
}
</script>
<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height: calc(100% - 44px - 49px);
  }
</style>