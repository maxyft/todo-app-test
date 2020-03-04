<template>
  <div class="note-list">
    <note
      v-for="(note, index) in noteList"
      :note="note"
      :key="note.created"
      @note-edit="onNoteEdit(index)"
      @note-delete="onNoteDelete(index)"
    />
    <div class="note-list__add-note" @click="onAddNote">
      <div class="basic-button basic-button--primary">
        Add Note
      </div>
    </div>

    <transition name="fadeIn">
      <modal-window
        v-if="isDeleteModalShow"
        :title="'Are you sure you want to delete the note?'"
        @ok="onDeleteModalOk"
        @cancel="onDeleteModalCancel"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import NoteListHandler from "./note-list";
export default class List extends NoteListHandler {}
</script>

<style lang="scss" scoped>
.note-list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;

  &__add-note {
    flex-basis: 100%;
    padding: 0.5rem;
  }
}
</style>
