import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";

import { INote, ITodo } from "../../types/todo.types";

import ModalWindow from "../../components/modal-component.vue";
import TodoItem from './ui/todo-item.vue'

@Component({
  components: {
    ModalWindow,
    TodoItem
  }
})
export default class NoteEditor extends Vue {
  @Getter("TODO_LIST_STORE/noteList")
  noteList!: INote[];

  @Mutation("TODO_LIST_STORE/ADD_NOTE")
  addNote!: (note: INote) => void;
  @Mutation("TODO_LIST_STORE/UPDATE_NOTE")
  updateNote!: (payload: { noteIndex: number; note: INote }) => void;
  @Mutation("TODO_LIST_STORE/DELETE_NOTE")
  deleteNote!: (noteIndex: number) => void;

  isUndoDialogShow = false;
  isDeleteDialogShow = false;
  isSavedNotificatorShow = false;

  localNote: INote | null = null;
  undoTempNote: INote | null = null;

  wait = (time: number) => new Promise(resolve => setTimeout(resolve, time));

  created() {
    if (this.noteToEdit === "new") {
      this.localNote = this.getInitialNoteObject();
    } else {
      try {
        this.localNote = this.getObjectClone(
          this.noteList[Number(this.noteToEdit)]
        );
        this.undoTempNote = this.getObjectClone(
          this.noteList[Number(this.noteToEdit)]
        );
      } catch (error) {
        this.$router.replace("/");
      }
    }
  }

  get noteToEdit(): number | string {
    return this.$route.params.id;
  }

  getObjectClone(object: any) {
    // use JSON parse && stringify to remove reactive link from the stored object
    return JSON.parse(JSON.stringify(object));
  }

  getInitialNoteObject(): INote {
    return {
      title: "",
      todoList: []
    };
  }

  addTodo(): void {
    (this.localNote as INote).todoList.push({
      title: "",
      done: false
    });
  }

  async onSaveNote(): Promise<any> {
    if (this.noteToEdit === "new") {
      const newId = this.noteList.length;

      this.addNote(this.localNote as INote);
      this.$router.replace(`/edit/${newId}`);
      this.undoTempNote = this.getObjectClone(
        this.noteList[Number(this.noteToEdit)]
      );
    } else {
      this.updateNote({
        noteIndex: Number(this.noteToEdit),
        note: this.localNote as INote
      });
    }

    this.isSavedNotificatorShow = true;
    await this.wait(3000);
    this.isSavedNotificatorShow = false;
  }

  onChangeTodo(index: number, newTodo: ITodo) {
    (this.localNote as INote).todoList[index] = newTodo
  }

  onDeleteTodo(index: number) {
    (this.localNote as INote).todoList.splice(index, 1);
  }

  onUndoChanges() {
    this.isUndoDialogShow = true;
  }

  onDeleteNote() {
    this.isDeleteDialogShow = true;
  }

  onUndoDialogOk() {
    this.localNote = JSON.parse(JSON.stringify(this.undoTempNote));
    this.isUndoDialogShow = false;
  }

  onUndoDialogCancel() {
    this.isUndoDialogShow = false;
  }

  onDeleteDialogOk() {
    this.isDeleteDialogShow = false;
    this.deleteNote(Number(this.noteToEdit));
    this.$router.push("/");
  }

  onDeleteDialogCancel() {
    this.isDeleteDialogShow = false;
  }
}
