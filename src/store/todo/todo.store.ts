import { ActionTree, GetterTree, MutationTree } from "vuex";
import { ITodoState, INote } from "../../types/todo.types";

const ADD_NOTE = "ADD_NOTE";
const UPDATE_NOTE = "UPDATE_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const SAVE_NOTE_LIST = "SAVE_NOTE_LIST";
const LOAD_NOTE_LIST = "LOAD_NOTE_LIST";

const namespaced = true;

const state: ITodoState = {
  noteList: []
};

const getters: GetterTree<ITodoState, null> = {
  noteList: (state: ITodoState) => state.noteList
};

const actions: ActionTree<ITodoState, null> = {};

const mutations: MutationTree<ITodoState> = {
  [ADD_NOTE](state, note: INote) {
    state.noteList.push(note);
  },
  [UPDATE_NOTE](
    state,
    { noteIndex, note }: { noteIndex: number; note: INote }
  ) {
    state.noteList[noteIndex] = note;
  },
  [DELETE_NOTE](state, noteIndex: number) {
    state.noteList.splice(noteIndex, 1);
  },
  [SAVE_NOTE_LIST](state) {
    localStorage.setItem("todoNoteList", JSON.stringify(state.noteList));
  },
  [LOAD_NOTE_LIST](state) {
    const savedNoteList = localStorage.getItem("todoNoteList");
    const parsedNoteList = savedNoteList ? JSON.parse(savedNoteList) : [];
    state.noteList = parsedNoteList;
  }
};

export default {
  actions,
  getters,
  mutations,
  namespaced,
  state
};
