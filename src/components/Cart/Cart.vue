<template>
  <div class="sidecart">
    <a href="./cart.html" class="cart-icon">
      <i class="fa fa-shopping-cart"></i>
      <span class="cart-num">{{totalNum}}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['isChange'],
  data () {
    return {
      totalNum: 0
    }
  },
  created () {
    if (this.isChange) {
      this.$root.$root.bus.$on('addItem', value => {
        this.totalNum = this.totalNum + value
        console.log(value)
      })
    }

    let num = 0
    if (window.localStorage.getItem('added')) {
      let obj = JSON.parse(window.localStorage.getItem('added'))
      obj.forEach(function (item, index) {
        num += item.num
      })
    }
    this.totalNum = num
  },
  beforeDestroy () {
    if (this.isChange) {
      this.$root.$root.$off('addItem')
    }
  }
}
</script>

<style scoped>
.cart-icon {
  position: relative;
  color: #333;
}
.cart-num {
  position: absolute;
  color: #FFF;
  background: #DC143C;
  width: 1rem;
  text-align: center;
  border-radius: 50%;
  font-size: .8rem;
  right: -.5rem;
  top: 0;
}
.sidecart {
  position: fixed;
  top: 50%;
  right: 2%;
  font-size: 1.8rem;
  border: 1px solid #ddd;
  border-radius: .2rem;
  z-index: 300;
  background-color: #FFF;
  padding: 1rem 1rem 1rem .6rem;
}
</style>
