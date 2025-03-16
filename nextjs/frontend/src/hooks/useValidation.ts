import { useEffect } from "react";
import useNotification from "./useNotification";

// type Validator<T> = (value: T) => void;

// const useValidation = <T>(value: T, validator: Validator<T>) => {
//   const { notification, setErrorNotification, clearNotification } = useNotification();

//   // ✅ Clear notification only when value changes
//   useEffect(() => {
//     return () => {
//       clearNotification(); // Clears when component unmounts or value changes
//     };
//   }, [value]);

//   useEffect(() => {
//     try {
//       validator(value);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         setErrorNotification(error.message);
//       } else {
//         setErrorNotification("An unknown error occurred");
//       }
//     }
//   }, [value, setErrorNotification, validator]); // ❌ Removed clearNotification from deps

//   return notification;
// };

type Callback = (value: any) => void;

const useValidation = (value: any, validator: Callback) => {
  const { notification, setErrorNotification, clearNotification } =
    useNotification();

  useEffect(() => {
    clearNotification();
    try {
      validator(value);
    } catch (error: any) {
      setErrorNotification(error.message);
    }
  }, [value]);

  return notification;
};

// export default useValidation;

export default useValidation;
