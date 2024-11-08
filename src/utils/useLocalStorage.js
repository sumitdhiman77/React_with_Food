import { useState } from "react";
const useLocalStorage = (key, initialValue) => {
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;
  const [value, setValue] = useState(storedValue);
  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
    // console.log(newValue);
  };
  return [value, updateValue];
};
export default useLocalStorage;
