import { Store } from "vuex";

export default () => (store: Store<any>) => {
  store.subscribe(mutation => {
    if (
      mutation.type !== "TODO_LIST_STORE/SAVE_NOTE_LIST" &&
      mutation.type !== "TODO_LIST_STORE/LOAD_NOTE_LIST"
    ) {
      // save note list in the local storage after every mutation
      store.commit("TODO_LIST_STORE/SAVE_NOTE_LIST", null, { root: true });
    }
  });
};
