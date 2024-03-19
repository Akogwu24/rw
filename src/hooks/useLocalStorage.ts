import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string | number | null | undefined) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setValue(typeof storedValue === 'string' ? storedValue : JSON.parse(storedValue));
      }
    } catch (error) {
      console.error(`Error retrieving '${key}' from local storage:`, error);
    }
  }, [key]);

  return value;
};

// example usage
// const storedValue = useLocalStorage('myData', null);
