<template>
  <div id="main">
    <Header/>
    <Title text="我的订单" />
    <div class="order-wrapper" v-if="orderList.length" v-for="order in orderList" :key="order.id">
      <div class="order">
        <div class="order-head">收货信息</div>
        <div class="order-body">
          <div class="order-info">
            <p><span class="order-label">收货人：{{order.name}}</span><span class="order-label order-label-left">手机号码：{{order.telephone}}</span><span class="order-label order-label-left">收货地址：{{order.location}}</span><span class="order-label order-label-left">下单时间：2018-06-22</span></p>
          </div>
        </div>
      </div>
      <div class="cart">
        <div class="cart-head">
          <div class="one-head fr-1">编号</div>
          <div class="one-head fr-4">商品</div>
          <div class="one-head fr-1">金额</div>
          <div class="one-head fr-2">数量</div>
          <div class="one-head fr-2">小计</div>
          <div class="one-head fr-2">操作</div>
        </div>

        <div class="cart-body">
          <div class="one-cart" v-for="item in order.content" :key="item.id">
            <div class="one-head fr-1">{{item.id}}</div>
            <div class="one-head fr-4">
              <div class="item-cover">
                <img :src="item.cover" />
              </div>
              <div class="item-info">
                <p class="item-title">{{item.name}}</p>
              </div>
              </div>
              <div class="one-head fr-1">
                <p class="item-price">{{item.price}}</p>
              </div>
              <div class="one-head fr-2">
                <p>{{item.num}}</p>
              </div>
              <div class="one-head fr-2">
                <p class="item-price">{{item.all}}</p>
              </div>
              <div class="one-head fr-2">
                <a href="#" class="remove-btn">取消订单</a>
              </div>
          </div>
        </div>
        <div class="cart-footer">
          <p class="cart-des">共有{{order.totalNum}}件商品</p>
          <p class="cart-block">合计 : <span class="cart-all">{{order.totalPrice}}</span></p>
          <p class="cart-block">订单状态：等待系统处理</p>
        </div>
      </div>
    </div>
    <div class="cart-empty" v-else>
       <p>还未购买过东西</p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header/header.vue'
import Num from '../../components/Num/Num'
import Footer from '../../components/Footer/Footer.vue'
import Title from '../../components/Title/Title.vue'
import axios from 'axios'
axios.defaults.withCredentials = true

export default {
  name: 'Detail',
  components: {
    Header,
    Footer,
    Num,
    Title
  },
  data () {
    return {
      orderList: []
    }
  },
  created () {
    let that = this
    that.getItems()
  },
  methods: {
    getItems: function () {
      let that = this
      axios({
        method: 'post',
        url: 'http://desktop-m2r784e:8080/MusicShop/showOrder.action',
        params: {
          token: window.localStorage.getItem('token')
        }
      }).then((res) => {
        console.log(res)
        if (res.data === -1) {
          return
        }
        that.orderList = res.data
        
        for(let i = 0; i < this.orderList.length; i++) {
          let item = that.orderList[i]
          let content = JSON.parse(item.content)
          let price = 0
          let count = 0
          let length = content.length
          let resArr = []

          function getInfo(index) {
            if (index >= length) {
              item.totalPrice = price
              item.totalNum = count
              that.$set(that.orderList[i], 'content', resArr)
              that.$set(that.orderList, i, that.orderList[i])
              console.log(that.orderList)
              return
            }
            let item1 = content[index]
            axios.get('http://desktop-m2r784e:8080/MusicShop/showOneItem.action?id=' + item1.id)
              .then(function (response) {
                let obj = Object.assign({}, item1, response.data)
                obj.all = obj.price * obj.num
                count += obj.num
                price += obj.all
                resArr.push(obj)
                getInfo(index + 1)
              })
              .catch(function (error) {
                console.log(error)
              })
          }
          getInfo(0)
        }
      })
    }
  }
}
</script>

<style scoped>
.cart {
  padding: 0 4rem;
}
.cart-head,
.cart-body {
  display: table;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid #ddd;
}
.cart-empty {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid #ddd;
  text-align: center;
  color: #999;
  font-size: 2rem;
}
.cart-head {
  font-size: .9rem;
  color: #999;
  border-bottom: none;
}

.cart-footer {
  border: 1px solid #ddd;
  border-top: none;
  font-size: 0;
  text-align: right;
}
.cart-price,
.cart-des,
.cart-block {
  display: inline-block;
}
.one-cart {
  display: table;
  width: 100%;
}
.one-head {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.fr-1 {
  width: 7.14%;
}
.fr-2 {
  width: 14.28%;
}
.fr-3 {
  width: 21.42;
}
.fr-4 {
  width: 42.84%;
}

.one-head .item-cover,
.one-head .item-info {
  display: table-cell;
  vertical-align: middle;
}
.one-head .item-cover {
  padding: 0 1rem;
}
.one-head .item-cover img {
  width: 6rem;
}
.cart-btn {
  background-color: #DC143C;
  font-size: 1.1rem;
  border: none;
  padding: .6rem 3rem;
  color: #FFF;
  cursor: pointer;
}
.cart-des {
  width: 20%;
  color: #999;
  font-size: .9rem;
}
.cart-block {
  width: 20%;
  color: #999;
  font-size: 1.1rem;
  margin-right: 2rem;
}
.cart-block .cart-all {
  color: #DC143C;
}
.one-head .item-price::before,
.cart-block .cart-all::before {
  content: '¥';
}
.order {
  padding: 0 4rem;
  margin-bottom: 2rem;
}
.order-head {
  background: #F2F2F2;
  font-weight: 600;
  color: #999;
  padding: .6rem 1rem;
  border-radius: .3rem;
  font-size: .9rem;
}
.order-body {
  padding: .4rem 1rem;
  font-size: .9rem;
}
.order-body .order-label {
  color: #999;
}
.order-info {
  width: 100%;
  text-align: center;
}
.order-label-left {
  margin-left: 2rem;
}
.order-body .order-btn {
  border: 1px solid #999;
  color: #999;
  font-size: .9rem;
  padding: .4rem 2rem;
  background-color: #FFF;
  cursor: pointer;
  border-radius: .2rem;
}
.remove-btn {
  text-decoration: none;
  font-size: .8rem;
  border: 1px solid #999;
  border-radius: .3rem;
  padding: .3rem 1rem;
  color: #333;
  transition: all .2s;
}
.remove-btn:hover {
  color: #DC143C;
}
.order input {
  border-radius: .2rem;
  border: 1px solid #ddd;
  padding: .8rem;
  font-size: .9rem;
  margin-top: 1rem;
  min-width: 18rem;
  transition: all .2s;
}
.order .order-input-long {
  width: 43.5rem;
}
.order-wrapper {
  margin-bottom: 2rem;
}
</style>
