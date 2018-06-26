<template>
  <div id="main">
    <Header />
    <div class="about">
      <div class="item-cover">
        <img :src="cover"/>
      </div>
      <div class="item-info">
        <p class="item-name">{{name}}</p>
        <p class="item-des">{{des}}</p>
        <p class="item-price">{{price}}</p>
        <Num :value="buyNum" @addtotal="addTotal" @redtotal="redTotal"></Num><span class="span-des">（还剩{{count}}件）</span>
        <div class="buy-btns">
          <button class="normal-btn">立即购买</button>
          <button class="heavy-btn" @click.prevent="addToCart"><i class="fa fa-shopping-cart"></i>加入购物车</button>
        </div>
      </div>
    </div>
    <div class="detail">
      <Title text="商品详情" />
      <div class="detail-content" v-html="detail"></div>
    </div>
    <Footer />
    <Cart :isChange="true"/>
  </div>
</template>

<script>
import Header from '../../components/Header/header.vue'
import Num from '../../components/Num/Num'
import Footer from '../../components/Footer/Footer.vue'
import Title from '../../components/Title/Title.vue'
import Cart from '../../components/Cart/Cart.vue'
import axios from 'axios'
axios.defaults.withCredentials = true

export default {
  name: 'Detail',
  components: {
    Header,
    Footer,
    Num,
    Title,
    Cart
  },
  data () {
    return {
      id: 0,
      name: '',
      des: '',
      cover: '',
      buyNum: 0,
      detail: '',
      price: '',
      count: 0
    }
  },
  mounted () {
    this.id = parseInt(window.location.hash.replace('#', ''))
    // console.log(window.location.hash.replace('#',''))
    axios.get('http://desktop-m2r784e:8080/MusicShop/showOneItem.action?id=' + this.id)
      .then((response) => {
        if (response.data !== '-1') {
          this.name = response.data.name
          this.des = response.data.des
          this.cover = response.data.cover
          this.detail = response.data.detail
          this.price = response.data.price
          this.count = response.data.count
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    addTotal: function () {
      if (this.buyNum === this.count) {
        return
      }
      this.buyNum++
    },
    redTotal: function () {
      if (this.buyNum === 0) {
        return
      }
      this.buyNum--
    },
    addToCart: function () {
      if (this.buyNum === 0) {
        return
      }

      let str = window.localStorage.getItem('added')
      let obj
      if (str) {
        obj = JSON.parse(str)
      } else {
        obj = []
      }

      console.log(obj)

      for (let i = 0; i <= obj.length; i++) {
        if (i === obj.length) {
          obj.push({
            id: this.id,
            num: this.buyNum
          })
          break
        } else if (obj[i].id === this.id) {
          obj[i].num += this.buyNum
          break
        }
      }
      window.localStorage.setItem('added', JSON.stringify(obj))
      this.$root.bus.$emit('addItem', this.buyNum)
    }
  }
}
</script>

<style scoped>
.about {
  padding: 2rem 4rem;
}

.about::after {
  content: '';
  display: block;
  clear: both;
}
.item-cover {
  float: left;
  width: 46%;
  background-color: #FAFAFA;
}
.item-cover img {
  width: 100%;
}
.item-info {
  float: right;
  width: 50%;
}
.item-info .item-name {
  font-size: 1.6rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}
.item-info .item-des {
  font-size: .9rem;
  color: #999;
  margin-bottom: 1rem;
}
.item-info .span-des {
  font-size: .8rem;
  color: #999;
}
.item-info .item-price {
  color: #DC143C;
  font-size: 1.6rem;
  margin-bottom: 1rem;
}
.item-info .item-price::before {
  content: '¥';
}
.buy-btns {
  margin-top: 2rem;
}
.normal-btn,
.heavy-btn {
  cursor: pointer;
  font-size: 1.2rem;
  padding: .5rem 2rem;
}
.normal-btn {
  background-color: #FFF;
  border: .1rem solid #DC143C;
  color: #DC143C;
  margin-right: 1rem;
}
.heavy-btn {
  background-color: #DC143C;
  color: #FFF;
  border: none;
  border: .1rem solid transparent;
}
.heavy-btn i {
  margin-right: .4rem;
}
.detail-content {
  padding: 0 4rem;
  line-height: 1.8;
  font-size: .9rem;
}
</style>
