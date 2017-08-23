<template>
  <div class="reader" id="reader">
    <top-nav></top-nav>
    <div class="read-container" :bg="bg_color" :night="bg_night" ref="fz_size">
      <h4>{{title}}</h4>
      <div class="chapterContent" v-show="!loading">
        <p v-for="(c,i) in content" :key="i">{{c}}</p>
      </div>
      <div class="btn-bar" v-show="!loading">
        <ul class="btn-tab">
          <li class="pre-btn" @click="preChapter">上一章</li>
          <li class="next-btn" @click="nextChapter">下一章</li>
        </ul>
      </div>
    </div>
    <div class="page-up" @click="pageUp()"></div>
    <div class="click-mask" @click="clickBar"></div>
    <div class="page-down" @click="pageDown()"></div>
    <div class="top-nav-pannel-bk font-container" v-show="font_panel"></div>
    <font-nav></font-nav>
    <bottom-nav></bottom-nav>

    <cover :class="{hide:!list_panel}"></cover>
    <list-pannel :class="{show:list_panel}" :bookId="$route.params.id"></list-pannel>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import axios from 'axios'
  import localEvent from '../store/local'
  import TopNav from './topNav/topNav'
  import BottomNav from './BottomNav/BottomNav.vue'
  import FontNav from './FontNav/FontNav'
  import ListPanel from './ListPanel/ListPanel.vue'
  import Cover from './Cover,vue'
  import Loading from './loading/loading..vue'

    export default {
      name: 'reader',
      data() {
        return {
          bar:false,
          timer:null,
          title:'',
          content:false,
          showList:false,
          booksReadInfo:{}
        }
      },
      components:{
        TopNav,
        BottomNav,
        FontNav,
        ListPanel,
        Cover,
        Loading
      },
      created:{
//        判断本地是否存储阅读器文字的大小
        if(localEvent.StorageGetter('fz_size')){
          this.$store.state.font_size = localEvent.StorageGetter('fz_size')
        }
//        判断本地是存储了于阅读器的主题色
        if(localEvent.StorageGetter('bg_color')){
          this.$store.state.bg_color = localEvent.StorageGetter('bg_color')
        }
//      加载时从localStorage中回去所有数据阅读进度
        const localBookReaderInfo = localEvent.StorageGetter('bookreaderinfo')
        let id = this.$route.params.id
//        当前书记以前读过并有阅读进度
        if(localBookReaderInfo &&localBookReaderInfo[id]){
          this.booksReadInfo = localEvent.StorageGetter('bookreaderinfo')
          this.getData(id,this.booksReaderInfo[id].chapter)
          this.$store.dispatch('curChapter',this.bookReaderInfo[id].chapter)
        }else{
          //当前书籍没有读过但是localStorage保存了其他书籍进度
          if(localBookReaderInfo){
            this.bookReaderInfo = localBookReaderInfo
            this.getData(id,1)
            this.$store.dispatch('curChapter',1)
          }else{
//            第一次阅读
            this.bookReaderInfo[id] = {
              book:id,
              chapter:1
            }
            this.getData(id,1)
            this.$store.dispatch('curChapter',1)
          }
        }
      },
      mounted(){
//        因为要获取dom元素，所以不能放到created中
        this.$ref.fz_size.style.fontSize = this.font_size + 'px'
      },
      methods:{
//        切换上下工具栏，如果字体面板显示点击也有关闭
        clickBar(){
          this.$store.dispatch('toggleBar')
          this.$store.state.font_panel = false
        },
//        向上f翻页
        pageUp(){
          let target = document.body.scrollTop - window.screen.height - 80
          this.startScroll(target,-20)
        }
//        向下翻页
        pageDown(){
          let target = document.body.scrollTop +window.screen.height -80
          this.startScroll(target, 20)
        },
        startScroll(target,speed){
          let times = null,
            times = setInterval(function(){
              if(speed >0){
                if(document.body.scrollTop <=target){
                  document.body.scrollTop +=speed
                }
                if(document.body.scrollTop > target ||
                  document.body.scrollTop + window.screen.height >= document.body.scrollHeight){
                  cleatInterval(times)
                }
              }else{
                if(document.body.scrollTop >= target){
                  document.body.scrollTop +=speed
                }
                if(document.body.scrollTop <target || document.body.scrollTop <=0){
                  cleatInterval(times)
                }
              }
            },1)
        },
        getData(id,chapter){
          this.loading = true
          axios.get(`${this.common.api}/book?book=${id}&id=${chapter}`).then(data=>{
            this.loading = false //获取完毕后就隐藏动画
            this.title = data.data.title
            this.content = data.data.content.split('-')
          })
          this.$store.state.windowHeight = window.screen.height
        },
        prevChapter(){
          this.$store.dispatch('prevChapter')
          this.saveBooksInfo()
          setTimeout(()=>{
            document.body.scrollTop = 0
          },300)
        },
//        更换章节时候保存阅读进度到localStorage
        nextChapter(){
          this.$store.dispatch('nextChapter',50)
          this.saveBooksInfo()
          setTimeout(()=>{
            doucument.body.scrollTop = 0
          },300)
        },
        saveBooksInfo(){
//          可以localStora保存每本小说的阅读进度
          let id =this.$route.parmas.id
          this.booksReaderInfo[id] = {
            book: id,
            chapter  : this.curChapter
          }
          localEvent.StorageSetter('bookReaderInfo',this.bookReaderInfo)
        },
        page(e){
          if(e.keyCode ==39){
            console.log(this.nextChapter)
            this.nextChapter()
          }else if(e.keyCode ==37){
            this.prevChapter()
          }
        }
      },
      computed:{
        ...mapState([
          'font_panel','bg_color','font_size','bg_night','cur_chapter',
          'windowHeight','list_panel'
        ])
      },
      watch:{
//        坚挺fz_size的值更改背景色
        font_size(val,oldVal) {
          this.$ref.fz_size.style.fontSize = val + 'px'
          localEvent.StorageSetter('fz_size',val)
        },
//        监听当前章节的改变。保存到本地病获取数据
        cur_chapter(val,oldVal) {
          localEvent.StorageSetter('cur_chapter',val)
          this.saveBookInfo()
          this.getData(this.$route.params.id,val)
        }
      }
    }
</script>
<style scoped lang="less">
  .reader{
    font-size:16px;
    color: #555;
    line-height: 31px;
    min-height:600px;
    padding:15px;
    h4{
      position: fixed;
      top:0;
      left:15px;
      right: 15px;
      height:50px;
      line-height:50px;
      font-size:20px;
      color: #736357;
      margin-bottom:1rem;
      leter-spacing:2px;
      white-space:nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p{
      text-indent:2em;
      margin:0.5rem 0;
      text-align: justify;
      letter-spacing: 0;
      line-height: 1.5;
      &:first-of-type{
        margin-top: 43px;
      }
    }
    .btn-bar{
      z-index: 55;
      width:80%;
      margin:20px auto 0;
      max-width:800px;
      .btn-tab{
        padding-left:0;
        height:34px;
        line-height: 34px;
        background-color: #000;
        border-radius: 8px;
        border:1px solid #858382;
        font-size:14px;
        opcaity:0.9;
        li{
          list-style: none;
          display: inline-block;
          width:49%;
          text-align: center;
          color: #fff;
          &:nth-child(1){
            border-right:1px solid #858382;
          }
        }
      }
    }
    .bac(@color){
      background-color: @color;
    }
    .read[bg='1'] {
      .bac(#e9dfc7);
      h4 {
        .bac(#e9dfc7);
      }
    }

    .readr[bg='2'] {
      .bac(#e7eee5);
      h4 {
        .bac(#e7eee5);
      }
    }

    .read[bg='3'] {
      .bac(#a4a4a4);
      h4 {
        .bac(#a4a4a4);
      }
    }

    .read[bg='4'] {
      .bac(#cdefcd);
      h4 {
        .bac(#cdefcd);
      }
    }

    .read[bg='5'] {
      .bac(#283548);
      h4 {
        .bac(#283548);
      }
    }

    .read[bg='6'] {
      .bac(#0f1410);
      h4 {
        .bac(#0f1410);
      }
    }
    .reader[night='true']{
      .bac(#0f1410)
      h4{
        .bac(#0f1410)
      }
    }
    .page-up{
      position: fixed;
      width:100%;
      height: 35%;
      top:0;
      color: #000;
      opacity: .1;
      z-index: 5;
    }
    .click-mask{
      position: fixed;
      width: 100%;
      height: 30%;
      top:35%;
      color:rgba(0,0,0,.1);
    }
    .page-down{
      position: fixed;
      width:100%;
      height: 35%;
      bottom:65px;
      color:rgba(0,0,0,.1);
      z-index:5;
    }
    .top-nav-pannel-bk{
      position: fixed;
      bottom:70px;
      height: 135px;
      background-color: #000;
      width:100%;
      color: #fff;
      opacity: .9;
      z-index:1111;
    }
    .fade-enter-active,
    .fade-leave-active{
      transform: opacity .5s;
    }
    .fade-enter,
    .fade-leave-active{
      opacity: 0;
    }
  }
</style>
