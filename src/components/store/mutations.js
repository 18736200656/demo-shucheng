import * as types from './mutations-type.js'

export default{
  [types.CHOOSE_BOOK] (state, id) {
    state.curBookDetailID = id
  },
  [types.SHOW_LIST_PANEL](state){
    state.list_panel = !state.list_panel
  },
  [types.SHOW_FONT_PANEL](state){
    state.font_panel = !state.font_panel
  },
  [ types.SWITCH_NIGHT ](state){
    state.bg_night = !state.bg_night
  },
  [types.FZ_SIZE_ADD](state){
    state.font_size ++
    if(state.font_size >=24){
        state.font_size = 24
    }
  },
  [types.FZ_SIZE_SUB](state){
    state.font_size --
    if(state.font_size <=14){
      state.font_size =14
    }
  },
  [types.CUR_CHAPTER](state, num){
    state.cur_chapter = num
  },
  [types.TOGGLE_BAR](state){
    state.bar = !state.bar
  },
  [types.PREV_CHAPTER](state){
    if(state.cur_chapter <=1){
      return false
    }
    state.cur_chapter --
  },
  [types.NEXT_CHAPTER](sate,maxChapter){
    if(state.cur_chapter>maxChapter){
      return false
    }
    state.cur_chapter ++
  },
  [types.CHOOSE_BOOK](state,id){
    state.curBookDetailId = id
  }


}
