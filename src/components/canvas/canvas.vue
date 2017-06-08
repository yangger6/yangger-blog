<template>
  <canvas id="canvas"></canvas>
</template>
<script>
  export default {
    name: 'canvas',
    data () {
      return {
      }
    }
  }
</script>
<script>
  window.onload = () => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#00ff85'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
</script>
<style scoped>
  @import "canvas.scss";
</style>
