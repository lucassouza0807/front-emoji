import { ReactElement } from "react";

type InputProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string,
    placeholder?: string,
    id?: string
    required?: boolean
};

export const Input: React.FC<InputProps> = ({ onChange, type, id, placeholder, required = true }): ReactElement  => {
    return (
        <input
            onChange={onChange}
            type={type}
            id={id}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
            placeholder={placeholder}
            required={required}
        />
    );
};
