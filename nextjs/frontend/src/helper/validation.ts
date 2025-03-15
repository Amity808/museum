export const validateName = (name: string) => {
    if (!name) throw new Error("Name should be in string");
    if (name.length < 2) throw new Error("name must be greater than 2");
  };


  export const validateAmount = (amount: number) => {
    if (!amount) throw new Error("amount should be in number");
    if (amount <= 0) throw new Error("amount must be greater than zero");
  };