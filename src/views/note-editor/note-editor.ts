import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";

import { INote, ITodo } from "../../types/todo.types";

import ModalWindow from "../../components/modal-component.vue";
import TodoItem from './ui/todo-item.vue';
import CustomInput from '../../components/custom-input.vue';

import getObjectClone from '../../function-helpers/getObjectClone';

@Component({
  components: {
    CustomInput,
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

  localNote: INote = this.createBlancNoteObject();

  isUndoDialogShow = false;

  isDeleteDialogShow = false;

  isSavedNotificatorShow = false;

  undoTempNote: INote | null = null;

  noteSnapshotsUndoStack: INote[] = []

  noteSnapshotsRedoStack: INote[] = []

  wait = (time: number) => new Promise(resolve => setTimeout(resolve, time));
  
  created() {
    if (this.noteToEdit !== "new") {
      try {
        // create unreactive clone of stored note
        this.localNote = getObjectClone(
          this.noteList[Number(this.noteToEdit)]
        );
        // create unreactive clone of stored note to use UNDO ALL feature
        this.undoTempNote = getObjectClone(
          this.noteList[Number(this.noteToEdit)]
        );
      } catch (error) {
        // return to the note list if the note with the current ID parameter does not exist
        this.$router.replace("/");
      }      
    }
  }

  get noteToEdit(): number | string {
    return this.$route.params.id;
  }

  // middleware-function for note update whitch makes possible to use UNDO/REDO logic
  async onNoteChange(changeType: string, payload: { index: number, data: ITodo | string | boolean }) {
    // clean REDO stack and push current snapshot of the note to UNDO stack
    this.noteSnapshotsRedoStack = []  
    const currentSnapshot = getObjectClone(this.localNote)
    this.noteSnapshotsUndoStack.push(currentSnapshot)

    switch (changeType) {
      case 'title':
        // if the title of the note was updated
        this.localNote.title = payload.data as string
        break
      case 'todo':
        // if the existing todo-item was updated
        this.localNote.todoList.splice(payload.index, 1, payload.data as ITodo) 
        break
      case 'add-todo':
        // if new todo-item was added
        this.addBlancTodoObject()
        break
      case 'delete-todo':
        // if existing todo-item was deleted
        this.localNote.todoList.splice(payload.index, 1);
        break
    }
  }

  onUndoLastChange(): void {
    // save current localNote state to REDO stack
    const currentNoteSnapshot: INote = getObjectClone(this.localNote)
    this.noteSnapshotsRedoStack.push(currentNoteSnapshot)

    // get the last saved snapshot
    const lastNoteSnapshot: INote = this.noteSnapshotsUndoStack.pop() as INote
    this.localNote = { ...lastNoteSnapshot }
  }

  onRedoLastChange(): void {
    // save current localNote state to UNDO stack
    const currentNoteSnapshot: INote = getObjectClone(this.localNote)
    this.noteSnapshotsUndoStack.push(currentNoteSnapshot)
    
    const lastNoteSnapshot: INote = this.noteSnapshotsRedoStack.pop() as INote
    this.localNote = { ...lastNoteSnapshot }
  }
  
  createBlancNoteObject(): INote {
    return {
      title: "",
      created: Date.now(),
      todoList: []
    };
  }

  addBlancTodoObject(): void {
    this.localNote.todoList.push({
      title: "",
      created: Date.now(),
      done: false
    });
  }
  
  async onSaveNote(): Promise<any> {
    // check that the localNote object is valid
    if (this.isNoteValidationError()) {
      return
    }

    if (this.noteToEdit === "new") {
      // in this case i use index as id parameter for /edit route
      const newIndex = this.noteList.length;
      
      // add blanc of note to stored noteList by using a vuex mutation
      this.addNote(this.localNote);
      // replace route with index parameter, to unlock Delete && Undo all functions
      this.$router.replace(`/edit/${newIndex}`);
      // get the cloned noteList object to use it later on Undo All click
      this.undoTempNote = getObjectClone(
        this.noteList[Number(this.noteToEdit)]
      );
    } else {
      // if an existing note was saved -> use Update vuex store mutation
      this.updateNote({
        noteIndex: Number(this.noteToEdit),
        note: this.localNote
      });
    }

    this.isSavedNotificatorShow = true;
    await this.wait(3000);
    this.isSavedNotificatorShow = false;
  }

  onUndoChanges(): void {
    this.isUndoDialogShow = true;
  }

  onDeleteNote(): void {
    this.isDeleteDialogShow = true;
  }

  onUndoDialogOk(): void {
    this.localNote = getObjectClone(this.undoTempNote);
    this.noteSnapshotsRedoStack = []
    this.noteSnapshotsUndoStack = []
    this.isUndoDialogShow = false;
  }

  onUndoDialogCancel(): void {
    this.isUndoDialogShow = false;
  }

  onDeleteDialogOk(): void {
    this.isDeleteDialogShow = false;
    this.deleteNote(Number(this.noteToEdit));
    this.$router.push("/");
  }

  onDeleteDialogCancel(): void {
    this.isDeleteDialogShow = false;
  }

  isNoteValidationError(): boolean {
    let isError = false
    // get the array of todo-item components
    const todoItems = this.$refs['todo-item'] as Vue[]
    todoItems.forEach(todoItem => {
      // execute Vuelidate $touch() func inside 
      // todo-item component to validate todo.title property
      todoItem.$v.$touch()
      if (todoItem.$v.$invalid) {
        isError = true
      }
    })

    return isError
  }
}
