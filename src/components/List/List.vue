<template>
 <div class="list-wrapper">
    <Title :text="text" />
    <div class="list">
      <a class="list-item" v-for="item in goods" :key="item.id" :href="'./detail.html#'+item.id">
        <div class="item-cover">
          <img :src="item.cover" :alt="item.name">
        </div>
        <div class="item-info">
          <p class="item-name">{{item.name}}</p>
          <p class="item-price">{{item.price}}</p>
        </div>
      </a>
      <div class="loading-wrapper" v-if="!isLoad">
         <span class="loading"><i class="fa fa-circle-o-notch"></i></span>
         <p>加载中...</p>
      </div>
    </div>
    <Page v-if="isShowPage"/>
 </div>
</template>
<script>
import Title from '../Title/Title.vue'
import Page from '../Page/Page.vue'
export default {
  name: 'List',
  components: {
    Title,
    Page
  },
  props: {
    isShowPage: Boolean,
    text: String,
    goods: Array
  },
  data () {
    return {
      isLoad: false
    }
  },
  mounted () {
    this.isLoad = true
  }
}
</script>
<style scoped>
.list {
  padding: 0 4rem;
}
.list::after {
  content: '';
  display: block;
  clear: both;
}
.list-item {
  display: block;
  width: 23%;
  height: 25rem;
  padding-right: 2.66%;
  float: left;
  color: #333;
  text-align: center;
  text-decoration: none;
}
.list-item:nth-child(4n) {
  padding-right: 0;
}
.list-item .item-cover img {
  width: 100%;
}
.list-item .item-price {
  color: #DC143C;
}
.list-item .item-price::before {
  content: '¥';
}
.loading-wrapper {
  width: 100%;
  padding: 2rem 0;
  font-size: 2rem;
  text-align: center;
  color: #999;
}
.loading-wrapper .loading {
  display: inline-block;
  animation: loaRotate 1.8s infinite;
}
@keyframes loaRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
