import Vue from 'vue'
import Login from './Login.vue'
import '../index/index.css'
import store from '../../store/index.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { Login },
  template: '<Login />'
})
