import Vue from 'vue'
import Vuex from 'vuex'
import mutaions from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  bar: false,
  cur_chapter :1,
  font_size:18,
  bg_night:false,
  font_panel:false,
  list_panel:false,
  curBookDetailID: 1
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
