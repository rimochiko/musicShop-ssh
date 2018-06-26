<template>
  <div class="title">
    <h1>{{text}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    text: String
  }
}
</script>

<style scoped>
.title {
  padding: 2rem 4rem;
  font-size: .8rem;
}
.title h1 {
  font-weight: 300;
}
</style>
