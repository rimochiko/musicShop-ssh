import Vue from 'vue'
import Detail from './detail.vue'
import '../index/index.css'
import 'font-awesome/css/font-awesome.min.css'
import store from '../../store/index.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { Detail },
  template: '<Detail/>',
  data: {
    bus: new Vue()
  }
})
