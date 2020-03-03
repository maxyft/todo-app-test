<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Mutation } from "vuex-class";

@Component
export default class App extends Vue {
  @Mutation("TODO_LIST_STORE/LOAD_NOTE_LIST")
  loadNoteList!: () => void;

  created() {
    this.loadNoteList();
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
