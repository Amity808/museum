import type { InputHTMLAttributes } from "react"


type CustomHTMLInputElementProps = {
    error: string;
} & InputHTMLAttributes<HTMLInputElement>



const CustomInput = ({
    id,
    name,
    error,
    value,
    className,
    ...props
  }: CustomHTMLInputElementProps) => {
    return (
      <div className="form-group mb-8">
        <input
          id={id}
          name={name}
          className={`input ${className}`}
          {...props}
          value={value}
        />
        {error &&  <div className="text-red-900 text-sm">{error}</div>}
      </div>
    );
  };

  export default CustomInput;