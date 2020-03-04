<template>
  <div class="note-editor">
    <div class="note-editor__header">
      <p class="note-editor__header-text paragraph">
        {{ noteToEdit === "new" ? "Add" : "Edit" }} Note
      </p>

      <div class="note-editor__button-group">
        <div
          class="basic-button basic-button--default"
          :class="{ 'basic-button--disabled': !noteSnapshotsUndoStack.length }"
          @click="onUndoLastChange"
        >
          Undo
        </div>

        <div
          class="basic-button basic-button--default"
          :class="{ 'basic-button--disabled': !noteSnapshotsRedoStack.length }"
          @click="onRedoLastChange"
        >
          Redo
        </div>                
      </div>

      <div class="note-editor__button-group note-editor__button-group--justify-end">
        <div
          class="basic-button basic-button--default"
          @click="$router.push('/')"
        >
          Back to list
        </div>
        <div
          v-if="noteToEdit !== 'new'"
          class="basic-button basic-button--warn"
          @click="onDeleteNote"
        >
          Delete note
        </div>
        <div
          v-if="noteToEdit !== 'new'"
          class="basic-button basic-button--primary"
          @click="onUndoChanges"
        >
          Undo all changes
        </div>
        <div class="basic-button basic-button--success" @click="onSaveNote">
          Save note
        </div>        
      </div>      

      <transition name="slideIn">
        <div
          class="notification notification--success"
          v-if="isSavedNotificatorShow"
        >
          Saved!
        </div>
      </transition>
    </div>
    <div class="note-editor__content">
      <custom-input 
        :placeholder="'Note Title'" 
        :value="localNote.title"
        @change="(value) => onNoteChange('title', { data: value })"
      />
      <div class="note-editor__todo-list">
        <p class="paragraph note-editor__todo-header">Todo's:</p>
        <todo-item 
          v-for="(todo, index) in localNote.todoList"
          ref="todo-item"
          :key="todo.created"
          :todo="todo"
          @todo-delete="onNoteChange('delete-todo', { index })"
          @todo-change="(newTodo) => onNoteChange('todo', { index, data: newTodo })"
        />
      </div>
      <div class="basic-button basic-button--primary" @click="onNoteChange('add-todo')">
        Add Todo
      </div>
    </div>

    <transition name="fadeIn">
      <modal-window
        v-if="isUndoDialogShow"
        :title="'Are you sure you want to undo changes?'"
        @ok="onUndoDialogOk"
        @cancel="onUndoDialogCancel"
      />

      <modal-window
        v-if="isDeleteDialogShow"
        :title="'Are you sure you want to delete the note?'"
        @ok="onDeleteDialogOk"
        @cancel="onDeleteDialogCancel"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NoteEditHandler from "./note-editor";
export default class NoteEditorTemplate extends NoteEditHandler {}
</script>

<style lang="scss" scoped>
@import "../../variables.scss";

.note-editor {
  &__header {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid $default-gray-color;
    .basic-button {
      margin-right: 0.5rem;
    }
  }
  &__button-group {
    display: flex;
    flex-grow: 1;

    &--justify-end {
      justify-content: flex-end;
    }
  }
  &__header-text {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
  &__content {
    max-width: 100%;
    padding: 0.75rem;
  }
  &__todo-list {
    padding: 0.75rem;
  }
  &__todo-header {
    margin-bottom: 0.25rem;
  }
}
</style>
