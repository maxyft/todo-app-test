interface ITodoState {
  noteList: INote[];
}

interface INote {
  title: string;
  todoList: ITodo[];
}

interface ITodo {
  title: string;
  done: boolean;
}

export { ITodoState, INote, ITodo };
