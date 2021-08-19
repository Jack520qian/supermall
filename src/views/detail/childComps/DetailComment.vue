<template>
  <div class="detail_comment" v-if="Object.keys(comment).length!=0">
    <div class="comment_title">
      <span>用户评价</span>
      <span class="comment_more">更多</span>
    </div>
    <div class="comment_info">
      <div class="u_info">
        <img :src="comment.user.avatar" alt="">
        <span>{{comment.user.uname}}</span>
      </div>
      <div class="comment_content">
        <div class="content">{{comment.content}}</div>
        <p class="content_info"> {{showDate}} {{comment.style}} </p>
      </div>
    </div>
    <div class="shop_reply" v-if="comment.explain!=null">
      {{comment.explain}}
    </div>
    <div class="comment_img" v-if="comment.images!=null">
      <img v-for="(item,index) in comment.images"
           :src="item"
           :key="index"
           alt="">
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../../common/utils";

  export default {
    name: "DetailComment",
    props: {
      comment: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showDate() {
        let date = new Date(this.comment.created * 1000);
        return formatDate(date, 'yyyy-MM-dd');
      }
    }
  }
</script>

<style scoped>
  .detail_comment {
    font-size: 0.65rem;
    padding: 0.42rem 0.34rem;
  }

  .comment_title {
    padding: 0.42rem 0;
    padding-bottom: 0.8rem;
    border-bottom: 0.08rem solid rgba(128, 128, 128, 0.3);
    position: relative;
    font-size: 15px;
  }

  .comment_more {
    position: absolute;
    right: 34px;
  }

  .comment_more::after {
    content: '';
    display: block;
    background: url(~assets/img/detail/right_arrow.svg) 0 0/1.06rem 1.06rem;
    position: relative;
    top: -17px;
    left: 34px;
    width: 1.06rem;
    height: 1.06rem;
  }

  .u_info {
    padding: .42rem 0;
    line-height: 1.8rem;
    display: flex;
  }

  .u_info img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 0.04rem solid rgba(128, 128, 128, .3);
  }

  .u_info span {
    margin-top: 10px;
    margin-left: 25px;
    font-size: 15px;
  }


  .comment_content .content {
    line-height: 1rem;
    color: #666;
    font-size: 15px;
  }

  .content_info {
    color: #999;
    padding: .3rem 0;
    font-size: 14px;
  }

  .shop_reply {
    border-top: 0.04rem solid rgba(128, 128, 128, 0.4);
    padding: .5rem 0;
    color: gray;
    line-height: .8rem;
  }

  .comment_img img {
    width: 100px;
    height: 101px;
    margin-right: .21rem;
  }
</style>
