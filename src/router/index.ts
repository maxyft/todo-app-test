import Vue from "vue";
import VueRouter from "vue-router";

import NoteList from "../views/note-list/note-list.template.vue";

const NoteEdit = () => import("../views/note-editor/note-editor.template.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "NoteList",
    component: NoteList
  },
  {
    path: "/edit/:id",
    name: "NoteEdit",
    component: NoteEdit
  }
];

const router = new VueRouter({
  routes
});

export default router;
