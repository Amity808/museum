import { useEffect } from "react";
import useNotification from "./useNotification";

type Validator<T> = (value: T) => void;

const useValidation = <T>(value: T, validator: Validator<T>) => {
  const { notification, setErrorNotification, clearNotification } = useNotification();

  useEffect(() => {
    clearNotification();
    try {
      validator(value);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorNotification(error.message);
      } else {
        setErrorNotification("An unknown error occurred");
      }
    }
  }, [value, clearNotification, setErrorNotification, validator]);

  return notification;
};

export default useValidation;