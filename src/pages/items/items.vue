<template>
  <div id="app">
    <Header />
    <Filters />
    <List text="商品列表" :goods="this.indexlist"/>
    <Footer />
    <Cart :isSide="true"/>
  </div>
</template>

<script>
import Header from '../../components/Header/header.vue'
import Filters from '../../components/Filters/Filters.vue'
import List from '../../components/List/list.vue'
import Footer from '../../components/Footer/Footer.vue'
import Cart from '../../components/Cart/Cart.vue'
import axios from 'axios'

export default {
  name: 'Items',
  components: {
    Header,
    List,
    Footer,
    Filters,
    Cart
  },
  data () {
    return {
      indexlist: []
    }
  },
  created () {
    this.getItems()
  },
  methods: {
    getItems: function () {
      let query
      if (window.location.hash) {
        query = window.location.hash.replace('#', '')
      } else {
        query = 'type=-1'
      }
      console.log(query)

      axios.get('http://desktop-m2r784e:8080/MusicShop/showPageItem.action?start=0&size=200&' + query)
        .then((response) => {
          console.log(response.data)
          this.indexlist = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }

  },
  mounted () {
    window.onhashchange = () => {
      this.getItems()
    }
  }
}
</script>

<style>
</style>
