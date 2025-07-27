"use client";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { EmailValidationState } from "@/data/data_types";

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  isEmailValid?: EmailValidationState;
  isValidatingEmail?: boolean;
}

const FormInput = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  required = false,
  isEmailValid,
  isValidatingEmail = false,
}: FormInputProps) => {
  const isEmail = type === 'email';
  const getBorderColor = () => {
    if (!isEmail) return "border-primary/20 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30";
    
    if (isEmailValid === false) return "border-red-500 bg-red-50 dark:bg-red-900/20";
    if (isEmailValid === true) return "border-green-500 bg-green-50 dark:bg-green-900/20";
    return "border-primary/20 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30";
  };

  const getLabelColor = () => {
    if (!isEmail) return "text-muted-foreground";
    
    if (isEmailValid === false) return "text-red-500";
    if (isEmailValid === true) return "text-green-500";
    return "text-muted-foreground";
  };

  return (
    <div className="group">
      <div className={`relative border rounded-lg transition-all duration-200 overflow-hidden ${getBorderColor()}`}>
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className="block w-full px-3 sm:px-4 pt-6 pb-2 text-sm sm:text-base bg-transparent appearance-none focus:outline-none peer"
          placeholder=" "
          required={required}
        />
        <label
          htmlFor={id}
          className={`absolute top-2 left-3 sm:left-4 text-xs transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs ${getLabelColor()}`}
        >
          {label}
        </label>

        {/* Email validation status icon */}
        {isEmail && value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValidatingEmail && (
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
            )}
            {!isValidatingEmail && isEmailValid === true && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
            {!isValidatingEmail && isEmailValid === false && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
        )}

        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
      </div>
    </div>
  );
};

export default FormInput;