<template>
  <div id="main">
    <Header :isShowCart="false"/>
    <Title text="我的购物车" />
    <div class="order">
      <div class="order-head">收货信息</div>
      <div class="order-body">
        <div class="order-info">
          <p><span class="order-label">收货人：</span><input type="text" placeholder="收货人" v-model="addName"><span class="order-label order-label-left">手机号码：</span><input type="text" placeholder="手机号码" v-model="addTel"></p>
          <p><span class="order-label">收货地址：</span><input type="text" placeholder="收货地址" v-model="addLocation" class="order-input-long"></p>
        </div>
      </div>
    </div>
    <div class="cart">
      <div class="cart-head">
        <div class="one-head fr-1">编号</div>
        <div class="one-head fr-4">商品</div>
        <div class="one-head fr-1">金额</div>
        <div class="one-head fr-3">数量</div>
        <div class="one-head fr-2">小计</div>
        <div class="one-head fr-1">操作</div>
      </div>

      <div class="cart-body" v-if="cartList.length">
        <div class="one-cart" v-for="item in cartList" :key="item.id">
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
          <div class="one-head fr-3">
            <Num :value="item.num" @addtotal="addtotal(item.id)" @redtotal="redtotal(item.id)"/>
          </div>
          <div class="one-head fr-2">
            <p class="item-price">{{item.all}}</p>
          </div>
          <div class="one-head fr-1">
            <a href="#" class="remove-btn" @click.prevent="removeItem(item.id)"><i class="fa fa-remove"></i></a>
          </div>
        </div>
      </div>
      <div class="cart-empty" v-else>
        <p>购物车为空</p>
      </div>
      <div class="cart-footer">
        <p class="cart-des">已有{{totalNum}}件商品</p>
        <p class="cart-block">合计 : <span class="cart-all">{{totalPrice}}</span></p>
        <button class="cart-btn" @click.prevent="pushOrder">提交订单</button>
      </div>
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
      isShowLocation: false,
      addName: '',
      addTel: '',
      addLocation: '',
      cartList: []
    }
  },
  computed: {
    totalPrice: function () {
      let total = 0
      this.cartList.forEach(function (item, index) {
        total += (item.price * item.num)
      })
      return total
    },
    totalNum: function () {
      let total = 0
      this.cartList.forEach(function (item, index) {
        total += item.num
      })
      return total
    }
  },
  methods: {
    changeLocation: function () {
      this.isShowLocation = !this.isShowLocation
    },
    cancelChange: function () {
      this.isShowLocation = false
    },
    removeItem: function (id) {
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].id === id) {
          this.cartList.splice(i, 1)
          break
        }
      }
      window.localStorage.setItem('added', JSON.stringify(this.cartList))
    },
    pushOrder: function () {
      let that = this
      console.log(window.localStorage.getItem('added'))
      axios({
        method: 'post',
        url: 'http://desktop-m2r784e:8080/MusicShop/pushOrder.action',
        params: {
          token: window.localStorage.getItem('token'),
          content: window.localStorage.getItem('added'),
          name: that.addName,
          telephone: that.addTel,
          location: that.addLocation
        }
      }).then((res) => {
        console.log(res)
        if (res.data === 1) {
          window.localStorage.setItem('added', '')
          window.location.href = './order.html'
        }
      })
    },
    getItems: function () {
      if (!window.localStorage.getItem('added')) {
        return []
      }

      let res = []
      let added = JSON.parse(window.localStorage.getItem('added'))
      added.forEach(function (item, index) {
        axios.get('http://desktop-m2r784e:8080/MusicShop/showOneItem.action?id=' + item.id)
          .then(function (response) {
            let obj = Object.assign({}, item, response.data)
            obj.all = obj.price * obj.num
            res.push(obj)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
      return res
    },
    addtotal: function (id) {
      let obj, objc
      let storage = JSON.parse(window.localStorage.getItem('added'))
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].id === id) {
          obj = this.cartList[i]
          objc = storage[i]
          break
        }
      }
      if (obj.num >= obj.count) {
        return
      }
      this.$set(obj, 'num', obj.num + 1)
      obj.all = obj.num * obj.price
      objc.num++
      window.localStorage.setItem('added', JSON.stringify(storage))
    },
    redtotal: function (id) {
      let obj, objc
      let storage = JSON.parse(window.localStorage.getItem('added'))
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].id === id) {
          obj = this.cartList[i]
          objc = storage[i]
          break
        }
      }

      if (obj.num === 1) {
        this.removeItem(id)
        return
      }

      this.$set(obj, 'num', obj.num - 1)
      obj.all = obj.num * obj.price
      objc.num--
      window.localStorage.setItem('added', JSON.stringify(storage))
    }
  },
  created () {
    this.cartList = this.getItems()
    console.log(this.cartList)
    // this.getAddress()
    this.isShowLocation = false
  },
  watch: {

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
  width: 10%;
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
</style>
