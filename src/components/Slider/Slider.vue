<template>
  <div class="slider-wrapper">
    <ul class="sliders" ref="sliders">
      <li v-for="item in contents" :key="item.key">
        <a :href="item.url">
          <img :src="item.image">
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data () {
    return {
      activeIndex: 1,
      contents: [{
        'key': 1,
        'image': 'http://p3.music.126.net/AEPIOVcyCCCfP8-uYsuI5g==/109951163339872388.jpg',
        'url': '#'
      }, {
        'key': 2,
        'image': 'http://p3.music.126.net/13lAg3Qs9Q7W4TkHvx3fKA==/109951163320684931.jpg',
        'url': '#'
      }, {
        'key': 3,
        'image': 'http://p3.music.126.net/Td5PevzvY_8MholoZtsS8w==/109951163337817907.jpg',
        'url': '#'
      }]
    }
  },
  mounted () {
    let sliders = this.$refs.sliders
    let length = sliders.childNodes.length
    let nodes = sliders.childNodes
    let that = this

    sliders.style.height = 510 + 'px'
    nodes[0].className = 'active'
    setInterval(function () {
      nodes.forEach(function (item, index) {
        if (item.tagName === 'LI') {
          item.className = ''
        }
      })
      let node = nodes[that.activeIndex]

      if (node.tagName === 'LI') {
        node.className = 'active'
      }
      that.activeIndex++
      if (that.activeIndex >= length) {
        that.activeIndex = 0
      }
    }, 8000)
  }
}
</script>

<style scoped>
.slider-wrapper {
}
.sliders {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.sliders li {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 0;
}
.sliders li a {
  display: block;
}
.sliders li img {
  display: block;
  width: 100%;
  opacity: 0;
  transition: all 1s;
}
.sliders li.active img {
  opacity: 1;
}
.sliders li.active {
  z-index: 10;
}
</style>
