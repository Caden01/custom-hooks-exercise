import { useState, useEffect } from "react";
import axios from "axios";

function useFlip(initialState = true) {
  const [isFlipped, setFlipped] = useState(initialState);

  const flip = () => {
    setFlipped((isUp) => !isUp);
  };

  return [isFlipped, flip];
}

function useAxios(key, baseUrl) {
  const [response, setResponse] = useLocalStorage(key);

  const addResponseData = async (
    formatter = (data) => data,
    restOfUrl = "",
  ) => {
    const res = await axios.get(`${baseUrl}${restOfUrl}`);
    setResponse((data) => [...data, formatter(res.data)]);
  };

  const clearResponse = () => setResponse([]);

  return [response, addResponseData, clearResponse];
}

function useLocalStorage(key, initialValue = []) {
  if (localStorage.getItem(key)) {
    initialValue = JSON.parse(localStorage.getItem(key));
  }
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export { useFlip, useAxios, useLocalStorage };
