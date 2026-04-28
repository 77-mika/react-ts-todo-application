import { IoCloseOutline, IoSunny } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../redux/ReduxHooks";
import { setShowSidebar, toggleTheme } from "../../redux/ui-management/UiManagement";
import { FaRegMoon } from "react-icons/fa";

const TopActionElement = () => {
        const { theme } = useAppSelector((state) => state.UiManagerReducer);
        const dispatch = useAppDispatch();
    return (
        <div className="flex justify-between md:justify-end items-center">
            <button
                className="block md:hidden "
                onClick={() => dispatch(setShowSidebar(false))}
            >
                <IoCloseOutline size={24} />
            </button>
            <button
                className={`block cursor-pointer transform transition-all ${theme === "dark" && "rotate-90"} `}
                onClick={() => dispatch(toggleTheme())}
            >
                {theme === "dark" ? (
                    <IoSunny size={24} />
                ) : (
                    <FaRegMoon size={24} />
                )}
            </button>
        </div>
    );
};

export default TopActionElement;
