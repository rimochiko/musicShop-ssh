<template>
  <div id="app">
    <div class="form-wrapper">
      <div class="form-box">
      <div class="logo">
        <h1 class="title">注册·年糕音乐商城</h1>
        <form class="form-main">
          <div class="form-group">
            <input type="text" placeholder="用户名" @blur="doCheckName" v-model="username" >
            <span :class="['tip', usernameTip.length <= 0 ? 'hidden ': '']" >{{usernameTip}}</span>
          </div>
          <div class="form-group">
            <input type="password" placeholder="密码" autocomplete @blur="doCheckPsd" v-model="password">
            <span :class="['tip', pswdTip.length <= 0 ? 'hidden': '']" >{{pswdTip}}</span>
          </div>
          <div class="form-group">
            <input type="password" placeholder="确认密码" autocomplete @blur="doCheckPsdRe" v-model="passwordre">
            <span :class="['tip', pswdreTip.length <= 0 ? 'hidden': '']" >{{pswdreTip}}</span>
          </div>
          <div class="form-group">
            <input type="text" placeholder="电子邮箱" autocomplete='email' @blur="doCheckEmail" v-model="email">
           <span :class="['tip', emailTip.length <= 0 ? 'hidden': '']" >{{emailTip}}</span>
          </div>
          <div class="form-group">
            <button class="form-btn" @click.prevent="regConfirm">确认注册</button>
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
  name: 'Register',
  data () {
    return {
      username: '',
      passwordre: '',
      password: '',
      email: '',
      usernameTip: '',
      pswdTip: '',
      pswdreTip: '',
      emailTip: '',
      errorInfo: ''
    }
  },
  methods: {
    doCheckName: function () {
      if (!this.username.match(/^\w{5,16}$/)) {
        this.usernameTip = '5-16位英文字母|数字|下划线'
        return
      }
      let that = this
      axios.get('http://desktop-m2r784e:8080/MusicShop/checkname.action?username=' + this.username)
        .then(function (response) {
          // console.log(response)
          if (response.data === 1) {
            that.usernameTip = '用户名已经存在'
          } else {
            that.usernameTip = ''
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      this.usernameTip = ''
    },
    doCheckPsd: function () {
      if (!this.password.match(/^\S{6,16}$/)) {
        this.pswdTip = '长度为6-16位'
        return
      }
      this.pswdTip = ''
    },
    doCheckPsdRe: function () {
      if (this.password !== this.passwordre) {
        this.pswdreTip = '两次密码应该一致'
        return
      }
      this.pswdreTip = ''
    },
    doCheckEmail: function () {
      if (!this.email.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
        this.emailTip = '邮件不符合规则'
        return
      }
      this.emailTip = ''
    },
    regConfirm: function () {
      if (this.usernameTip || this.pswdTip || this.pswdreTip || this.emailTip) {
        this.errorInfo = '请按照提示修正信息'
        return
      }

      axios({
        method: 'post',
        url: 'http://desktop-m2r784e:8080/MusicShop/regUser.action',
        params: {
          username: this.username,
          password: this.password,
          passwordre: this.passwordre,
          email: this.email
        }
      }).then((res) => {
        console.log(res)
        window.localStorage.setItem('token', res.data)
        window.location.href = './index.html'
      }).catch((err) => {
        console.log(err)
        this.errorInfo = '注册失败，请重试'
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
</style>
