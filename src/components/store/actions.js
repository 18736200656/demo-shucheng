import * as types from './mutations-type'

export default {
  chooseBook ({commit}, id) {
    commit(types.CHOOSE_BOOK, id)
  },
  showListPanel({commit}){
    commit(types.SHOW_LIST_PANEL)
  },
  showFontPanel({commit}){
    commit(types.SHOW_FONT_PANEL)
  },
  switchNight({commit}){
    commit(types.SWITCH_NIGHT)
  },
  fzSizeSub({commit}){
    commit(types.FZ_SIZE_SUB)
  },
  fzSizeAdd({commit}){
    commit(types.FZ_SIZE_ADD)
  },
  curChapter({commit}){
    commit(types.CUR_CHAPTER)
  },
  toggleBar({commit}){
    commit(types.TOGGLE_BAR)
  },
  prevChapter({commit}){
    commit(types.PREV_CHAPTER)
  },
  nextChapter({commit, maxChaper}) {
    commit(types.NEXT_CHAPTER, maxChaper)
  }

}
