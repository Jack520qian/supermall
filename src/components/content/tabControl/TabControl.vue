<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
      class="tab-control-item" 
      :class="{active: index === currentIndex}"
      @click="itemClick(index)" :key="(item.value,index.value)">
      <span>{{item}}</span>  
    </div>  
  </div>  
</template>
<script>
export default {
  name:"TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    },
  },
  data(){
    return{
      currentIndex : 0,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('itemClick',index);
    }
  }
}
</script>
<style scoped>
  .tab-control{
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    text-align: center;
    background-color: #fff;

  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;

  }
  .active{
    color: var(--color-high-text);
  }

  .active span{
    border-bottom: 3px solid var(--color-tint);

  }
</style>