import type { ComponentProps } from "react";
import { ImSpinner } from "react-icons/im"


const AppButton = ({title, className,isLoading,...rest}:ComponentProps<"button"> & {isLoading?:boolean}) => {
    return (
        <button
            {...rest}
            type="submit"
            className={`flex mt-5 h-12 disabled:opacity-50 disabled:cursor-default items-center justify-center w-full text-center rounded-lg border-0 bg-sky-700 text-white hover:bg-sky-400 transition-all ease-in-out cursor-pointer hover:text-black hover:border-0 ${className} `}
            disabled={isLoading}
        >
           {isLoading ? (
                <ImSpinner size={30} className="animate-spin" />
           ) : (title || "ثبت")}
        </button>
    );
};

export default AppButton;
