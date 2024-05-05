import { Dispatch, SetStateAction, useState } from 'react';
import { MdOutlineWaterDrop } from 'react-icons/md';
import findBestMatch from '@/components/smartBar/smarBarAlgo';

interface SmartBarProps {
  setTodoItems: Dispatch<SetStateAction<string[]>>;
  setDoneItems: Dispatch<SetStateAction<string[]>>;
  todoItems: string[];
  doneItems: string[];
}

export default function SmartBar({
  setDoneItems,
  setTodoItems,
  todoItems,
  doneItems,
}: SmartBarProps) {
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  const handleSend = async () => {
    if (value === '') return;

    //const wantedItemInTodo = todoItems.find((item) => item === value);
    //const wantedItemInDone = doneItems.find((item) => item === value);
    // Find the best match
    const bestChoice = findBestMatch(todoItems.concat(doneItems), value);

    if (todoItems.includes(bestChoice)) {
      // If the best choice is in the todoItems, move it to doneItems
      setDoneItems((prev) => [...prev, bestChoice]);
      setTodoItems((prev) => prev.filter((item) => item !== bestChoice));
    } else if (doneItems.includes(bestChoice)) {
      // If the best choice is in the doneItems, move it to todoItems
      setTodoItems((prev) => [...prev, bestChoice]);
      setDoneItems((prev) => prev.filter((item) => item !== bestChoice));
    } else {
      setError(true);
    }

    setValue('');
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-acqua-soft-white">
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setError(false);
          setValue(event.target.value);
        }}
        placeholder="Type something..."
        className={`flex-1 p-2 text-base border rounded-lg border-gray-300 ${
          error ? 'border-red-500' : ''
        }`}
      />
      <button
        onClick={handleSend}
        className="bg-acqua-deep-blue hover:bg-acqua-darker-blue text-white p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out"
        title="Send"
      >
        <MdOutlineWaterDrop className="text-xl" />
      </button>
    </div>
  );
}
