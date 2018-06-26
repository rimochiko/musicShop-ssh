<template>
  <div class="header">
    <div class="logo"><a href="./index.html">年糕音乐·商城</a></div>
    <div class="header-right">
      <div class="search">
        <span class="search-icon"><i class="fa fa-search"></i></span>
        <input type="text" placeholder="关键词" class="search-input" @keydown.enter="querySearch" v-model="querykey">
      </div>
      <div class="option" v-if="isLogin">
        <a href="./login.html">登录</a>
        <a href="./register.html">注册</a>
      </div>
      <div class="option" v-if="!isLogin">
        <div class="avatar">
          <img src="../../assets/logo.jpg"/>
          <ul class="dropmenu">
            <li><a href="./cart.html">购物车</a></li>
            <li><a href="./order.html">我的订单</a></li>
            <li><a href="#" @click.prevent="logout">注销</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  data () {
    return {
      querykey: ''
    }
  },
  computed: {
    isLogin: function () {
      return !window.localStorage.getItem('token')
    }
  },
  methods: {
    logout: function () {
      axios({
        method: 'post',
        url: 'http://desktop-m2r784e:8080/MusicShop/logoutUser.action',
        params: {
          token: window.localStorage.getItem('token')
        }
      }).then((res) => {
        console.log(res)
        if (res.data === 1) {
          window.localStorage.removeItem('token', res.data)
          window.location.href = window.location.href
        } else {
          window.localStorage.setItem('token', '')
          window.location.href = window.location.href
        }
      }).catch((err) => {
        console.log(err)
        window.localStorage.setItem('token', '')
        window.location.href = window.location.href
      })
    },
    querySearch: function () {
      window.location.href = './items.html#keyword=' + window.encodeURIComponent(this.querykey)
    }
  }
}
</script>

<style scoped>
.header {
  padding: 1rem 4rem;
  height: 3rem;
  position: relative;
  box-shadow: 0 0 .6rem #ddd;
  position: relative;
  z-index: 100;
}
.header .logo {
  float: left;
  font-size: 2rem;
}
.header .logo > a {
  text-decoration: none;
  color: #333;
}
.header .header-right {
  float: right;
}
.header-right .search,
.header-right .option {
  display: table-cell;
  vertical-align: middle;
}
.header-right .search {
  position: relative;
  padding-right: 2rem;
}
.header-right .search-icon {
  position: absolute;
  top: .9rem;
  left: .7rem;
  color: #888;
}
.header-right .search-input {
  padding: .5rem 1rem .5rem 2rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  width: 15rem;
}
.header-right .option {
  height: 3.1rem;
}
.header-right .option > a {
  text-decoration: none;
  color: #222;
  font-size: .9rem;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  padding: .4rem .6rem;
  margin-left: .5rem;
}
.header-right .option .avatar {
  position: relative;
}
.header-right .option .avatar img {
  width: 2.3rem;
  border: 1px solid #ddd;
  padding: .3rem;
  border-radius: 50%;
}
.header-right .option .avatar:hover .dropmenu {
  display: block;
}
.header-right .option .avatar .dropmenu {
  display: none;
  position: absolute;
  left: -1.5rem;
  background-color: #FFF;
  padding: .5rem;
  border-radius: .3rem;
  box-shadow: 0 0 5px #ddd;
}
.header-right .option .avatar .dropmenu li {
  width: 5rem;
}
.header-right .option .avatar .dropmenu li a {
  font-size: .9rem;
  line-height: 2;
  text-decoration: none;
  text-align: center;
  color: #666;
  display: block;
}
.header-right .option .avatar .dropmenu li a:hover {
  color: #DC143C;
}
</style>
