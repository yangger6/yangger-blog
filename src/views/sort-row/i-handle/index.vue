<template>
  <div class="i-handle">
    <i class="i-1"></i>
    <i class="i-2"></i>
    <i class="i-3"></i>
  </div>
</template>

<script>
  export default {
    name: 'i-handle'
  }
</script>

<style scoped lang="scss">
  .i-handle {
    width: 17px;
    &.hold-on{
      .i-1 {
        transform: translateY(-2px);
        &:before {
          transform-origin: right top;
          transform: rotate(-30deg);
        }
        &:after {
          transform-origin: left top;
          transform: rotate(30deg);
        }
      }
      .i-2{
        margin-top: 4px;
        opacity: 0;
      }
      .i-3 {
        margin-top: 4px;
        transform: translateY(2px);
        &:before {
          transform-origin: right bottom;
          transform: rotate(30deg);
        }
        &:after {
          transform-origin: left bottom;
          transform: rotate(-30deg);
        }
      }
    }
    .i-1, .i-2, .i-3 {
      height: 2px;
      display: flex;
      transition: .2s;
    }
    .i-2{
      width: 100%;
      margin: 2px 0;
      background-color: #d2d2d2;
    }
    .i-1, .i-3{
      &:before,&:after {
        content: ' ';
        display: block;
        width: 50%;
        height: inherit;
        background-color: #d2d2d2;
      }
    }
  }
</style>
