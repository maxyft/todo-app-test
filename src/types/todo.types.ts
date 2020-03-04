interface ITodoState {
  noteList: INote[];
}

interface INote {
  title: string;
  created: number;
  todoList: ITodo[];
}

interface ITodo {
  title: string;
  created: number;
  done: boolean;
}

export { ITodoState, INote, ITodo };
