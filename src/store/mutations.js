export default {
  // mutations唯一的目的就是修改state中状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  addCounter(state,payload){
    payload.count++;
    window.localStorage.setItem('cartList', JSON.stringify(state.cartList))

  },
  addToCart(state,payload){
    payload.checked = true;
    state.cartList.push(payload);
    //更新缓存
    window.localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  // 购物车商品选中按钮点击 更新缓存
  updateData(state) {
    window.localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
}