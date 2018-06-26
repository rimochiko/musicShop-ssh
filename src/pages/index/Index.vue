<template>
  <div id="main">
    <Header />
    <Slider />
    <List text="推荐商品" :goods="this.indexlist" :isShowPage="false"/>
    <div class="section-more">
      <p class="p-more">更多音乐品牌周边、数码物品、音乐专辑</p>
      <a class="btn-more" href="./items.html">查看全部</a>
    </div>
    <Footer />
    <Cart :isSide="true"/>
  </div>
</template>

<script>
import Header from '../../components/Header/header.vue'
import Slider from '../../components/Slider/slider.vue'
import List from '../../components/List/list.vue'
import Footer from '../../components/Footer/Footer.vue'
import Cart from '../../components/Cart/Cart.vue'
import axios from 'axios'

export default {
  name: 'Index',
  components: {
    Header,
    Slider,
    List,
    Footer,
    Cart
  },
  data () {
    return {
      indexlist: []
    }
  },
  created () {
    let that = this
    axios.get('http://desktop-m2r784e:8080/MusicShop/showIndexItem.action?size=8')
      .then(function (response) {
        that.indexlist = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>
.section-more {
  width: 100%;
  margin-top: 2rem;
  padding: 4rem 0;
  text-align: center;
  background-color: #EEE;
}
.section-more .p-more {
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
}
.section-more .btn-more {
  color: #333;
  border: 1px solid #999;
  text-decoration: none;
  font-size: 1rem;
  padding: .2rem 1rem;
  border-radius: .3rem;
  transition: all .2s;
}
.section-more .btn-more:hover {
  background-color: #DC143C;
  color: #FFF;
  border-color: #DC143C;
}
</style>
