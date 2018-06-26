<template>
  <div class="num-picker">
    <a href="#" class="num-btn" @click.prevent="redNum"><i class="fa fa-minus"></i></a>
    <input type="text" :value="value" class="num-input"/>
    <a href="#" class="num-btn" @click.prevent
    ="addNum"><i class="fa fa-plus"></i></a>
  </div>
</template>

<script>
export default {
  name: 'Num',
  props: ['value', 'id'],
  methods: {
    addNum: function () {
      // console.log(this.value)
      if (this.id) {
        this.$emit('addtotal')
      } else {
        this.$emit('addtotal', {
          id: this.id
        })
      }
    },
    redNum: function () {
      if (this.id) {
        this.$emit('redtotal')
      } else {
        this.$emit('redtotal', {
          id: this.id
        })
      }
    }
  },
  watch: {
    value: function (oldV, newV) {
      console.log(oldV)
    }
  }
}
</script>

<style scoped>
.num-picker {
  display: inline-block;
  width: 8rem;
  font-size: 0;
  vertical-align: middle;
  height: 2rem;
  border: 1px solid #ddd;
}
.num-btn {
  display: inline-block;
  height: 2rem;
  padding: 0 .7rem;
  line-height: 2rem;
  font-size: .8rem;
  text-align: center;
  text-decoration: none;
  color: #777;
}
.num-input {
  border: none;
  outline: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-top: none;
  border-bottom: none;
  height: 2rem;
  font-size: .9rem;
  width: 2.4rem;
  padding: 0 .7rem;
  text-align: center;
}
</style>
