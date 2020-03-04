import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import { INote } from "../../types/todo.types";

import Note from "./ui/note.vue";
import ModalWindow from "../../components/modal-component.vue";

@Component({
  components: {
    Note,
    ModalWindow
  }
})

export default class NoteList extends Vue {
  @Getter("TODO_LIST_STORE/noteList")
  noteList!: INote[];

  @Mutation("TODO_LIST_STORE/DELETE_NOTE")
  deleteNote!: (noteIndex: number) => void;

  @Mutation("TODO_LIST_STORE/LOAD_NOTE_LIST")
  loadNoteList!: () => void;

  isDeleteModalShow = false;
  
  noteToDelete = -1;

  onAddNote(): void {
    this.$router.push("/edit/new");
  }

  onNoteEdit(index: number) {
    this.$router.push(`/edit/${index}`);
  }

  onNoteDelete(index: number) {
    this.isDeleteModalShow = true;
    this.noteToDelete = index;
  }

  onDeleteModalOk() {
    this.deleteNote(this.noteToDelete);
    this.isDeleteModalShow = false;
  }

  onDeleteModalCancel() {
    this.isDeleteModalShow = false;
    this.noteToDelete = -1;
  }
}
