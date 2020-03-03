<template>
  <div class="note-wrapper">
    <div class="note">
      <div class="note__content">
        <div class="note__header">
          <p class="note__title">{{ note.title }}</p>
          <div class="note__btn-group">
            <div
              class="basic-button basic-button--primary"
              @click="$emit('note-edit')"
            >
              Edit
            </div>
            <div
              class="basic-button basic-button--warn"
              @click="$emit('note-delete')"
            >
              Delete
            </div>
          </div>
        </div>
        <div
          v-for="(todo, index) in note.todoList.slice(0, 2)"
          class="note__todo"
          :key="index"
        >
          <input type="checkbox" :checked="todo.done" :id="index" disabled />
          <label :for="index"> {{ todo.title }} </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { INote } from "../../../types/todo.types";

@Component
export default class Note extends Vue {
  @Prop(Object)
  note!: INote;
}
</script>

<style lang="scss" scoped>
@import "../../../variables.scss";

.note-wrapper {
  flex-basis: 50%;
  max-width: 50%;
  .note {
    padding: 0.5rem;
    &__content {
      padding: 0.5rem;
      border: 1px solid $default-gray-color;
      border-radius: 5px;
      min-height: 150px;
    }
    &__header {
      padding: 0.5rem 0;
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid $default-gray-color;
    }
    &__title {
      margin: 0;
      padding: 0 0.5rem;
      font-size: 1.025rem;
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
    }
    &__btn-group {
      align-self: flex-start;
      flex-shrink: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .basic-button:first-child {
        margin-right: 0.3rem;
      }
    }
    &__todo {
      padding-left: 0.5rem;
    }
  }
}
</style>
