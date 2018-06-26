import Vue from 'vue'
import Register from './Register.vue'
import '../index/index.css'
import store from '../../store/index.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { Register },
  template: '<Register/>'
})
