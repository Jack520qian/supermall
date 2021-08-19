<template>
  <div class="category">
    <CategoryNavBar/>
    <scroll class="scroll" ref="scroll">
      <div class="Contents">
        <left-content
                :list="leftList"
                @changeRightData="ChangeRightData"
                class="left"
        ></left-content>
        <right-content class="right"
                       :rightList="rightList"
                       @imgLoad="imgLoad"
        ></right-content>
      </div>
    </scroll>
  </div>
</template>

<script>
  import CategoryNavBar from "./childComponents/CategoryNavBar";
  import LeftContent from "./childComponents/LeftContent";
  import RightContent from "./childComponents/RightContent";
  import {getAllCategory, getSubCategory} from "network/category";
  import Scroll from "components/common/scroll/Scroll";
  import {deBounce} from "common/utils";

  export default {
    name: "Category",
    components: {
      CategoryNavBar,
      LeftContent,
      RightContent,
      Scroll
    },
    data() {
      return {
        leftList: [],
        rightList: []
      }
    }
    ,
    created() {
      getAllCategory().then(res => {
        this.leftList = res.data.category.list;
      });

    },
    mounted() {
      this.refresh = deBounce(this.$refs.scroll.refresh,10);
    },
    methods: {
      ChangeRightData(maitKey) {
        //根据子组件左边选项传递过来的maitKey请求对应的数据来进行渲染右边列表
        getSubCategory(maitKey).then(res => {
          this.rightList = res.data.list;
        })
      },
      imgLoad() {
        this.refresh();
      }
    }
  }
</script>

<style scoped>
  .category {
    width: 100%;
  }

  .scroll > div {
    position: relative;
  }

  .left {
    width: 30%;
    float: left;
  }

  .right {
    /*overflow: hidden;*/
    /*position: absolute;*/
    width: 70%;
    float: right;
    /*right: 0;*/
  }

  .scroll {
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }

  .Contents {
    /*height: 850px;*/
    /*height: auto;*/
    /*position: relative;*/
    overflow: hidden;
  }

</style>
