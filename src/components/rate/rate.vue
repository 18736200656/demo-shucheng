<template>
  <div class="rate-score">
    <span class="star-item" :class="item" v-for="(item,index) in itemClasses"></span>{{score}}
  </div>
</template>

<script>
    export default {
      data () {
        return {}
      },
      props:['score'],
      computed:{
        itemClasses() {
          let result = []
          let score = Math.floor(this.score * 2) / 2
          let hasDecimal = score % 2 === 1
          let integer = Math.floor(score)
          for (var i = 0; i < integer; i++) {
            result.push('on')
          }
          if (hasDecimal) {
            result.push('half')
          }
          while (result.length < 5) {
            result.push('off')
          }
          return result
        }
      }
    }
</script>
<style scoped lang="less">
  .rate-score{
    display: flex;
    align-items: center;
    .star-item{
      display: inline-block;
      width:20px;
      height:20px;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      &.on{
        background:url('./star_on.png')
      }
      &.half{
        background:url("./star_half.png")
      }
      &.off{
        background: url("./star_off.png");
      }
      &:last-of-type{
        margin-right:10px;
      }
    }
  }
</style>
