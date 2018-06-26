import Vue from 'vue'
import Index from './Index.vue'
import './index.css'
import 'font-awesome/css/font-awesome.min.css'
import store from '../../store/index.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { Index },
  template: '<Index/>'
})
