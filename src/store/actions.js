export default {
  addCart(context , payload){
    // payLoad新添加的商品
    // 数组常用的方法有哪些？push/pop/reduce/unshift/shift/sort/reverse/map/filterjoin...

    // let oldProduct = null;
    // for(let item of state.cartList){
    //   if(item.iid === payLoad.iid){
    //     oldProduct = item;
    //   }
    // }

    return new Promise((resolve,reject) => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item  => item.iid == payload.iid);

      // 2.判断oldProduct
      if(oldProduct){ //数量加一
        // oldProduct.count += 1;
        context.commit('addCounter',oldProduct);
        resolve('当前的商品数量+1');
      }else{
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit('addToCart',payload);
        resolve('添加了新的商品');
      }
    })
    
  }
}