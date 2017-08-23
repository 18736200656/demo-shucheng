<template>
  <div class="recommend">
    <h2 class="title">{{title}}</h2>
    <div class="list">
      <ul class="list-ul">
        <li class="list-li" v-for="(item,index) in booklist">
          <router-link :to="{path:'/bookdetail/'+item.id}" @click.native="bookDetailId(item.id)">
            <img :src="item.images" alt="" @error="loadImage($event)">
            <p class="book-name">{{item.name}}</p>
            <p class="book-author">{{item.author}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'Recommend',
      data () {
        return {}
      },
      props: ['booklist', 'title'],
      methods: {
        bookDetailId (id) {
          this.$store.dispatch('chooseBook', id)
        },
        loadImage (e) {
          this.common.defaultImage(e)
        }
      }
    }
</script>
<style scoped>
  .recommend{
    padding: 15px 0;
    margin-bottom: 15px;
    background-color: #fff;
    .title{
      margin-left:15px;
      margin-bottom: 10px;
      border-left:2px solid #f00;
      text-indent:1rem;
      font-size:16px;
      line-height: 16px;
    }
    .list{
      .list-ul{
        position: relative;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        text-indent:7px;
        .list-li{
          display: inline-block;
          margin-right:8px;
          width:100px;
          img{
            width: 100%;
            height:128px;
          }
          p{
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
        }
      }
    }
  }
</style>
