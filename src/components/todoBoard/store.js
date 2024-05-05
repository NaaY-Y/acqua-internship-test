import create from 'zustand';
import { persist } from 'zustand/middleware';

const TODO_ITEMS = [
  'AI Fish or Phish',
  'Compile Coral DB',
  'AI Sub Navigation',
  'Server Water Cooling',
  'Whale Song AI',
  'Marine Chatbot',
];
const DONE_ITEMS = ['Dolphin Comm Sim'];

const useStore = create(
  persist(
    (set) => ({
      todoItems: TODO_ITEMS,
      doneItems: DONE_ITEMS,
      setTodoItems: (todo) =>
        set((state) => ({
          todoItems: todo,
          doneItems: state.doneItems.filter((item) => !todo.includes(item)),
        })),
      setDoneItems: (done) =>
        set((state) => ({
          doneItems: done,
          todoItems: state.todoItems.filter((item) => !done.includes(item)),
        })),
    }),
    {
      name: 'todo-storage',
      getStorage: () =>
        typeof window !== 'undefined' ? localStorage : undefined,
    },
  ),
);

if (
  TODO_ITEMS.length + DONE_ITEMS.length !==
  useStore.getState().todoItems.length + useStore.getState().doneItems.length
) {
  useStore.setState({
    todoItems: TODO_ITEMS,
    doneItems: DONE_ITEMS,
  });
}

export default useStore;
