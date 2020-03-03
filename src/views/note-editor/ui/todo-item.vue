<template>
  <div class="note-editor__todo-item">
    <input
      class="todo-item-checkbox"
      v-model="localTodo.done"
      type="checkbox"
      @change="$emit('todo-change', localTodo)"
    />
    <div class="text-input todo-item-input">
      <div
        class="text-input__placeholder"
        :class="{
          'text-input__placeholder--transparent':
            localTodo.title && localTodo.title.length > 0
        }"
      >
        Todo text
      </div>
      <input 
        class="text-input__input" 
        type="text" 
        v-model="localTodo.title" 
        @change="$emit('todo-change', localTodo)"
      />
    </div>
    <div
      class="basic-button basic-button--warn todo-item-button"
      @click="$emit('todo-delete')"
    >
      delete
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { ITodo } from '../../../types/todo.types'

@Component
export default class TodoItem extends Vue {
  @Prop(Object)
  todo!: ITodo

  localTodo: ITodo = JSON.parse(JSON.stringify(this.todo))
}
</script>

<style lang="scss" scoped>
  .note-editor__todo-item {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    padding: 0.35rem 0;
    .todo-item-checkbox {
      flex-shrink: 1;
    }
    .todo-item-input {
      flex-grow: 1;
      margin-right: 0.5rem;
    }
    .todo-item-button {
      flex-shrink: 1;
    }
  }
</style>