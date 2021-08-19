<template>

  <div class="left" v-if="list.length!=0">
    <div class="left-list">
      <span
              v-for="(item,index) in list"
              :class="{active:currentIndex==index}"
              @click="itemClick(index,item)"
      >{{item.title}}</span>
    </div>
  </div>

</template>

<script>

  export default {
    name: "LeftContent",
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        currentIndex: 0,

      }
    },
    methods: {
      itemClick(index, item) {
        this.currentIndex = index;
        //把当前选项对应的maitKey传给父组件,让父组件去请求数据
        this.$emit('changeRightData', item.maitKey)
      }
    },
    watch: {
      //因为数据是异步请求的,Category在请求数据的时候,子组件left已经在渲染了
      //所以此时在created和mouted都获取不到父组件传递过来的数据
      //所以采取watch监听
      list() {
        //默认显示第一个选项对应的数据
        this.$emit('changeRightData', this.list[0].maitKey)
      }
    }
  }
</script>

<style scoped>

  .left {
    background-color: #eeeeee;
    color: black;
  }

  span {
    display: block;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-bottom: 1px solid gainsboro;
  }

  span.active {
    background-color: #fff;
    color: #ff5777;
  }
</style>
