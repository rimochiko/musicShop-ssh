<template>
  <div class="filter-wrapper">
    <div class="filter">
      <span class="filter-head">分类显示：</span>
      <ul class="filter-list">
        <li v-for="item in types" :key="item.id">
           <a :href="itemhref(item.id)">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="filter">
      <span class="filter-head">排列顺序：</span>
      <ul class="filter-list">
        <li><a href="#">价格（低到高）</a></li>
        <li><a href="#">销量（高到低）</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Filters',
  data () {
    return {
      types: []
    }
  },
  created () {
    let that = this
    axios.get('http://desktop-m2r784e:8080/MusicShop/showType.action')
      .then(function (response) {
        that.types = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    itemhref: function (id) {
      if (window.location.href.indexOf('keyword') >= 0) {
        return window.location.href + '&type=' + id
      }
      return window.location.href.replace(/^#[\S\s]*$/, '') + '#type=' + id
    }
  }
}
</script>

<style scoped>
.filter-wrapper {
  margin-top: 1rem;
  border: 1px solid #ddd;
  border-radius: .3rem;
  margin: 2rem 4rem 0;
}
.filter {
  border-bottom: 1px solid #ddd;
  padding: 1rem;
}
.filter::after {
  content: '';
  display: block;
  clear: both;
}
.filter:last-child {
  border-bottom: none;
}
.filter .filter-head {
  color: #999;
  font-weight: 600;
  display: block;
  float: left;
  width: 5rem;
  text-align: center;
  font-size: .9rem;
}
.filter .filter-list {
  float: left;
  font-size: 0;
}
.filter .filter-list li {
  display: inline-block;
  vertical-align: center;
  margin-right: 1rem;
}
.filter .filter-list li a {
  display: block;
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;
}
</style>
