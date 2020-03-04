import { ValidationRuleset } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import { ITodo } from "../../../types/todo.types";

export const validations: ValidationRuleset<{
  todoItem: ITodo;
}> = {
  todoItem: {
    title: {
      required
    },
    done: {}
  }
};
