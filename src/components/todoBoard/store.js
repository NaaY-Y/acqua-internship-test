import create from 'zustand';
import { persist } from 'zustand/middleware';

// Setting default values
const TODO_ITEMS = [
  'AI Fish or Phish',
  'Compile Coral DB',
  'AI Sub Navigation',
  'Server t Cooling',
  'Whale Song AI',
  'Marine Chatbot',
];
const DONE_ITEMS = ['Dolphin Comm Sim'];

// Store with the todoItems and doneItems, and function to set them
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
      getStorage: () => localStorage,
    },
  ),
);

// We can disable this if we want to avoid the check (Can be annoying for updating our list)
// Checks if an item was added, removed, updated from the list
// Putting a button on the UI/UX to refresh the list can be a good idea
// Then we can avoid this check, all would be done with the UI/UX
/*
if (
  TODO_ITEMS.concat(DONE_ITEMS).filter(
    (item) =>
      !useStore
        .getState()
        .todoItems.concat(useStore.getState().doneItems)
        .includes(item),
  ).length !== 0
) {
  useStore.setState({
    todoItems: TODO_ITEMS,
    doneItems: DONE_ITEMS,
  });
}
*/

export default useStore;
