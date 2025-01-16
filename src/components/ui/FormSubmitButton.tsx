import { ReactElement } from "react"

type SubmitProps = {
    children: React.ReactNode,
    disabled?: boolean
}

export const FormSubmitButton: React.FC<SubmitProps> = ({ children, disabled }): ReactElement => {
    return (
        <button
            id="login-submit-button"
            disabled={disabled}
            type="submit"
            className="flex items-center justify-center w-full py-3 bg-purple-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all"
        >
            {children}
        </button>
    )

}