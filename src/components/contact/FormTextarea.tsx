"use client";

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
}

const FormTextarea = ({
  id,
  name,
  label,
  value,
  onChange,
  rows = 4,
  required = false,
}: FormTextareaProps) => {
  return (
    <div className="group">
      <div className="relative border border-primary/20 rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-all duration-200 overflow-hidden">
        <textarea
          name={name}
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
          className="block w-full px-3 sm:px-4 pt-6 pb-2 text-sm sm:text-base bg-transparent appearance-none focus:outline-none resize-none peer"
          placeholder=" "
          required={required}
        />
        <label
          htmlFor={id}
          className="absolute top-2 left-3 sm:left-4 text-xs text-muted-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs"
        >
          {label}
        </label>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
      </div>
    </div>
  );
};

export default FormTextarea;