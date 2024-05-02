'use client';

import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import SmartBar from '@/components/smartBar';
import useStore from './store';
import { useEffect } from 'react'; // adjust the path as necessary

export default function TodoBoard() {
  // Extract the store values
  const { todoItems, doneItems, setTodoItems, setDoneItems } = useStore();

  // Call with the initial values extracted from the storee
  const [todoList, todoItemsDrag, updateTodoItems] = useDragAndDrop<
    HTMLUListElement,
    string
  >(todoItems, {
    group: 'todoList',
  });
  const [doneList, doneItemsDrag, updateDoneItems] = useDragAndDrop<
    HTMLUListElement,
    string
  >(doneItems, {
    group: 'todoList',
  });

  // Detect whenever a change is made to todoItemsDrag or setTodoItems
  useEffect(() => {
    // Update if needed
    if (todoItems !== todoItemsDrag) {
      setTodoItems(todoItemsDrag);
    }
  }, [todoItemsDrag, setTodoItems]);

  // Detect whenever a change is made to doneItemsDrag or setDoneItems
  useEffect(() => {
    // Update if needed
    if (doneItems !== doneItemsDrag) {
      setDoneItems(doneItemsDrag);
    }
  }, [doneItemsDrag, setDoneItems]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-acqua-soft-white">
      <h1 className="text-3xl font-bold text-acqua-deep-blue my-6">
        Acqua Board
      </h1>
      <SmartBar
        todoItems={todoItemsDrag}
        doneItems={doneItemsDrag}
        setTodoItems={updateTodoItems}
        setDoneItems={updateDoneItems}
      />
      <div className="flex justify-center items-start gap-8 p-5">
        <ul
          ref={todoList}
          className="bg-acqua-yellow rounded-lg p-4 shadow-md w-80 h-96"
        >
          {todoItemsDrag.map((todo) => (
            <li className="p-2 bg-white rounded-lg shadow mb-2" key={todo}>
              {todo}
            </li>
          ))}
        </ul>
        <ul
          ref={doneList}
          className="bg-acqua-darker-blue rounded-lg p-4 shadow-md w-80 text-white h-96"
        >
          {doneItemsDrag.map((done) => (
            <li
              className="p-2 rounded-lg line-through decoration-acqua-retro-yellow decoration-2 shadow mb-2"
              key={done}
            >
              {done}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
