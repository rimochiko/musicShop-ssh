<template>
  <div id="app">
    <div class="form-wrapper">
      <div class="form-box">
      <div class="logo">
        <h1 class="title">登录·年糕音乐商城</h1>
        <form class="form-main">
          <div class="form-group">
            <input type="text" placeholder="用户名" v-model="username" autocomplete @blur="checkName">
            <span :class="['tip', usernameTip.length <= 0 ? 'hidden ': '']" >{{usernameTip}}</span>
          </div>
          <div class="form-group">
            <input type="password" placeholder="密码" v-model="password" autocomplete @blur="checkPsw">
            <span :class="['tip', passwordTip.length <= 0 ? 'hidden': '']" >{{passwordTip}}</span>
          </div>
          <div class="form-group">
            <button class="form-btn" @click.prevent="loginConfirm">登录</button>
            <p>{{errorInfo}}</p>
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true

export default {
  name: 'Login',
  data () {
    return {
      passwordTip: '',
      usernameTip: '',
      username: '',
      password: '',
      errorInfo: '',
      isSend: false
    }
  },
  methods: {
    checkName: function () {
      if (this.username === '') {
        this.usernameTip = '用户名不能为空'
        return
      }
      this.usernameTip = ''
    },
    checkPsw: function () {
      if (this.password === '') {
        this.passwordTip = '密码不能为空'
        return
      }
      this.passwordTip = ''
    },
    loginConfirm: function () {
      if (this.usernameTip || this.passwordTip) {
        return
      }
      this.errorInfo = '身份验证中...'
      axios({
        method: 'post',
        url: 'http://desktop-m2r784e:8080/MusicShop/loginUser.action',
        params: {
          username: this.username,
          password: this.password
        }
      }).then((res) => {
        if (res.data === -1) {
          this.errorInfo = '密码/用户名错误'
        } else {
          this.errorInfo = '登录成功'
          window.localStorage.setItem('token', res.data)
          window.location.href = './index.html'
        }
      })
    }
  }
}
</script>

<style scoped>
#app {
  display: table;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#FAFAFA, #EEE);
}
.form-wrapper {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.form-box {
  width: 25rem;
  padding: 1.5rem 1rem 1rem;
  margin: 0 auto;
  border-radius: .5rem;
  background-color: #FFF;
  box-shadow: 0 0 10px #999;
}
.form-box .title {
  font-weight: 300;
}
.form-main .form-group > input {
  border-radius: .2rem;
  border: 1px solid #ddd;
  padding: .8rem;
  font-size: .9rem;
  margin-top: 1rem;
  min-width: 18rem;
  transition: all .2s;
}
.form-main .form-group > input:focus {
  border-color: #DC143C;
}
.form-main .form-btn {
  background-color: #DC143C;
  color: #FFF;
  border: none;
  font-size: .9rem;
  border-radius: .2rem;
  padding: .8rem;
  min-width: 19.6rem;
  cursor: pointer;
  margin-top: 1rem;
}
.form-group {
  position: relative;
}
.form-group .tip.hidden {
  display: none;
}
.form-group .tip {
  position: absolute;
  right: -5rem;
  top: 1.5rem;
  background: rgba(0, 0, 0, .6);
  display: block;
  padding: .3rem .5rem;
  border-radius: .3rem;
  color: #FFF;
  font-size: .9rem;
}
.form-group .tip::before {
  content: '';
  display: block;
  position: absolute;
  top: .55rem;
  left: -.3rem;
  border-top: .3rem solid transparent;
  border-right: .3rem solid rgba(0, 0, 0, .6);
  border-bottom: .3rem solid transparent;
}
.form-group p {
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: .8rem;
  color: #999;
}
.form-grou .form-btn .unable {
  background-color: #aaa;
}
</style>
