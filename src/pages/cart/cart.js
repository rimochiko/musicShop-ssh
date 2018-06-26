import Vue from 'vue'
import Cart from './cart.vue'
import '../index/index.css'
import 'font-awesome/css/font-awesome.min.css'
import store from '../../store/index.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { Cart },
  template: '<Cart/>'
})
