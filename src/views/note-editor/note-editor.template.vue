<template>
  <div class="note-editor">
    <div class="note-editor__header">
      <p class="note-editor__header-text paragraph">
        {{ noteToEdit === "new" ? "Add" : "Edit" }} Note
      </p>
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
        Undo changes
      </div>
      <div class="basic-button basic-button--success" @click="onSaveNote">
        Save note
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
      <div class="text-input">
        <div
          class="text-input__placeholder"
          :class="{
            'text-input__placeholder--transformed':
              localNote.title && localNote.title.length > 0
          }"
        >
          Note Title
        </div>
        <input
          class="text-input__input"
          type="text"
          v-model="localNote.title"
        />
      </div>
      <div class="note-editor__todo-list">
        <p class="paragraph note-editor__todo-header">Todo's:</p>
        <todo-item 
          v-for="(todo, index) in localNote.todoList"
          :key="index"
          :todo="todo"
          @todo-delete="onDeleteTodo(index)"
          @todo-change="(newTodo) => onChangeTodo(index, newTodo)"
        />
      </div>
      <div class="basic-button basic-button--primary" @click="addTodo">
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
