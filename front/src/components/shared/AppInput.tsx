import type { ComponentProps } from "react";

const AppInput = ({ title, id,className, ...rest }: Omit<ComponentProps<"input">,"title"> & {title:string}) => {
    return (
        <div className="flex flex-col">
            <label className="pb-2 dark:text-white " htmlFor="title ">
                {title}
            </label>
            <input
                type="text "
                className={`h-12 rounded-lg border pr-3 ${className} dark:text-white ` }
                id={id}
                {...rest}
            />
        </div>
    );
};

export default AppInput;
