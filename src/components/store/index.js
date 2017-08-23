import Vue from 'vue'
import Vuex from 'vuex'
import mutaions from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  bar: false,
  font_panel:false,
  font_icon:false,
  list_panel:false,
  font_size:18,
  bg_color:1,
  bg_night:false,
  cur_chapter :1,
  windowHeight:'',
  curBookDetailID: 1,
  curBookContentId:1

}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
