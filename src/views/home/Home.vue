<template>
  
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" ref="tabControl1"  @itemClick="itemClick" v-show="isTabFixed"></tab-control>

    <scroll class="content" 
          ref="scroll" 
          :probe-type="3" 
          @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore"
          >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" ref="tabControl2"  @itemClick="itemClick"></tab-control>
      <goods-list :goods="showGoods" ></goods-list>
    </scroll>
    
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
  
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper.vue"
  import RecommendView from "./childComps/RecommendView.vue"
  import FeatureView from "./childComps/FeatureView.vue"

  import NavBar from "../../components/common/navbar/NavBar.vue"
  import TabControl from  "../../components/content/tabControl/TabControl.vue"
  import GoodsList from "../../components/content/goods/GoodsList.vue"
  import Scroll from "../../components/common/scroll/Scroll.vue"
  import BackTop from "../../components/content/backTop/BackTop.vue"

  import {getHomeMultidata , getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
      
    },
    data(){
      return{
        // result : null,
        banners : [],
        recommends : [],
        goods:{
          pop:{page:0,list:[]},
          new:{page:0,list:[]},
          sell:{page:0,list:[]}
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    created(){
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell') 

    },
    mounted(){
      
    },
    destroyed(){
      console.log('home destroyed');
    },
    activated(){
      // console.log('activated');
      this.$refs.scroll.scroll.scrollTo(0 , this.saveY , 0)
      this.$refs.scroll.scroll.refresh()
    },
    deactivated(){
      // console.log('deactivated');
      this.saveY = this.$refs.scroll.getScrollY();
    },
    methods:{
      /* 
       *  事件监听相关的方法
       */
      itemClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }

        // 让两个tabControl的currentIndex保持一致
        if(this.$refs.tabControl1 !== undefined){
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        }
        
      },
      backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        // console.log(position);
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      
      // scroll的content区域没有进行刷新解决出现拖不下去的问题
      // 处理方式一：
      // 监听loadMore事件
      loadMore(){
        this.getHomeGoods(this.currentType);

        this.$refs.scroll.scroll.refresh();
      },
      swiperImageLoad(){
        // 获取tabControl的offsetTop
        // 所有的组件都有一个属性$el:用于获取组件中的元素
        this.tabOffsetTop =  this.$refs.tabControl2.$el.tabOffsetTop;
      },

      /* 
       *  网络请求相关方法
       */
      getHomeMultidata(){
          getHomeMultidata().then((res)=>{
          // console.log(res);

          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list ;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    /* 第二种安置滚动框方法 */
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9; */
  }

  /* .tab-control{
    position: sticky;
    top:44px;

    z-index: 9;
  } */

  .tab-control{
    position: relative;
    z-index: 9;
  }

  .content{
    /* 第一种安置滚动框方法 */
    /* height: calc(100% - 93px); */
    /* margin-top: 44px; */

    /* 第二种安置滚动框方法 */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
