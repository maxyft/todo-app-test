<template>
  <div class="note-editor__todo-item">
    <input
      class="todo-item-checkbox"
      v-model="todoItem.done"
      type="checkbox"
      @change="$emit('todo-change', todoItem)"
    />
    <custom-input
      class="todo-item-input"
      :placeholder="'Todo text'"
      :value="todoItem.title"
      :hidePlaceholder="true"
      :isError="$v.todoItem.title.$dirty && $v.todoItem.title.$invalid"
      @change="onTodoTitleChange"
    />
    <div
      class="basic-button basic-button--warn todo-item-button"
      @click="$emit('todo-delete')"
    >
      delete
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { ITodo } from "../../../types/todo.types";
import { validationMixin, Vuelidate } from "vuelidate";
import { validations } from "../validation/todo-item.validation";

import CustomInput from "../../../components/custom-input.vue";

import getObjectClone from "../../../function-helpers/getObjectClone";

@Component({
  components: { CustomInput },
  mixins: [validationMixin],
  validations
})
export default class TodoItem extends Vue {
  @Prop(Object)
  todo!: ITodo;

  @Watch("todo")
  refreshLocalTodo(val: ITodo) {
    // watching on the todo-prop
    // needed for correctly template updating on UNDO/REDO events
    this.todoItem = getObjectClone(val);
  }

  // validation object
  // that checks required props of the todo object
  $v: Vuelidate<any>;
  todoItem: ITodo = getObjectClone(this.todo);

  onTodoTitleChange(value: string) {
    // write changes to $v object model to use validation features
    this.$v.todoItem.title.$model = value;
    this.todoItem.title = value;
    this.$emit("todo-change", this.todoItem);
  }
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
