import Vue from 'vue'
import Order from './Order.vue'
import '../index/index.css'
import store from '../../store/index.js'
import 'font-awesome/css/font-awesome.min.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { Order },
  template: '<Order />'
})
