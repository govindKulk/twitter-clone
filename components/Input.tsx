interface InputProps {
    placeholder?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
  }
  
  const Input: React.FC<InputProps> = ({ placeholder, value, type = "text", onChange, disabled, label }) => {
    return (
      <div className="w-full">
        {label && <p className="text-xl text-black font-semibold mb-2">{label}</p>}
        <input
          disabled={disabled}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
          className="
            w-full
            p-4 
            text-lg 
            bg-blue-200 
            border-2
            border-neutral-800 
            rounded-md
            outline-none
            text-black
            focus:border-sky-500
            focus:border-2
            transition
            disabled:bg-neutral-900
            disabled:opacity-70
            disabled:cursor-not-allowed
            placeholder-neutral-500
          "
        />
      </div>
     );
  }
   
  export default Input;