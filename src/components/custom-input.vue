<template>
  <div 
    class="text-input" 
    :class="{ 'text-input--error': isError }"
  >
    <div
      class="text-input__placeholder"
      :class="{
        'text-input__placeholder--transformed':
          isInputFocused || localValue,
        'text-input__placeholder--transparent':
          hidePlaceholder && (isInputFocused || localValue)
      }"
    >
      {{ placeholder }}
    </div>
    <input 
      class="text-input__input" 
      type="text" 
      v-model.lazy.trim="localValue"
      @change="$emit('change', localValue)"
      @focus="isInputFocused = true"
      @blur="isInputFocused = false"
    />
    <transition name="slideIn">
      <div 
        v-if="isError"
        class="text-input__error"
      >
        This field is required
      </div>
    </transition>
  </div>  
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class CustomTextInput extends Vue {
  @Prop(String)
  placeholder!: string
  @Prop(String)
  value!: string
  @Prop(Boolean)
  hidePlaceholder!: boolean
  @Prop({ default: false })
  isError!: boolean

  @Watch('value')
  refreshLocalValue(val: string) {
    // watching on the value-prop 
    // needed for correctly template updating on UNDO/REDO events
    this.localValue = val
  }

  localValue: string = this.value
  isInputFocused = false
}
</script>