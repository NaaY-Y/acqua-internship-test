import create from 'zustand';
import { persist } from 'zustand/middleware';

// Storage created with zustand and persit middleware
const useStore = create(
  persist(
    (set) => ({
      todoItems: [],
      doneItems: [],
      setTodoItems: (newTodoItems) => set({ todoItems: newTodoItems }),
      setDoneItems: (newDoneItems) => set({ doneItems: newDoneItems }),
    }),
    {
      name: 'todoList-storage',
      getStorage: () => localStorage,
    },
  ),
);

export default useStore;
