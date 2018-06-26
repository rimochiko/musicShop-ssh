<template>
  <ul class="page">
    <li><a href="#"><i class="fa fa-caret-left"></i></a></li>
    <li><a href="#" class="active">1</a></li>
    <li><a href="#"><i class="fa fa-caret-right"></i></a></li>
  </ul>
</template>

<script>
export default {
  name: 'Page'
}
</script>

<style>
.page {
  text-align: center;
  font-size: 0;
}
.page > li {
  display: inline-block;
}
.page > li > a {
  display: block;
  font-size: 1rem;
  padding: .3rem .5rem;
  margin: 0 .4rem;
  color: #333;
  border-radius: .3rem;
  text-decoration: none;
  border: 1px solid #ddd;
  font-size: .9rem;
}
.page > li > a.active {
  background-color: #DC143C;
  color: #FFF;
}
</style>
