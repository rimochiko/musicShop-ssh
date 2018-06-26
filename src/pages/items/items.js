import Vue from 'vue'
import Items from './items.vue'
import '../index/index.css'
import 'font-awesome/css/font-awesome.min.css'
import store from '../../store/index.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { Items },
  template: '<Items />'
})
