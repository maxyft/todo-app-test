<template>
  <div class="modal-component-wrapper">
    <div class="modal-component">
      <div class="modal-component__content">
        {{ title }}
      </div>
      <div class="modal-component__footer">
        <div class="basic-button basic-button--primary" @click="$emit('ok')">
          Ok
        </div>
        <div class="basic-button basic-button--warn" @click="$emit('cancel')">
          Cancel
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class ModalComponent extends Vue {
  @Prop(String)
  title!: string;
}
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.modal-component-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-component {
    padding: 0.75rem;
    background: white;
    border: 1px solid $default-gray-color;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
    &__content {
      font-weight: 600;
      font-size: 1.025rem;
      border-bottom: 1px solid $default-gray-color;
      padding: 0.5rem 0;
    }

    &__footer {
      display: flex;
      flex-direction: row-reverse;
      padding-top: 0.5rem;
      padding-bottom: 0.25rem;
      .basic-button:last-child {
        margin-right: 0.25rem;
      }
    }
  }
}
</style>
