import { RxHamburgerMenu } from "react-icons/rx";
import { useAppDispatch } from "../../redux/ReduxHooks";
import { setShowSidebar } from "../../redux/ui-management/UiManagement";
import { convertMiladi2Jalali } from "@/utils/dateUtils";
import {BellIcon,CircleDotIcon,User2Icon} from "lucide-react"

function Header() {
    const dispatch = useAppDispatch()
    return (
        <section
            id="header"
            className="fixed top-0 left-0 h-app-header-h w-full bg-white dark:bg-gray-700 md:pr-app-sidebar-w shadow-lg p-2"
        >
        
        <div className="flex items-center justify-between h-full px-4">
                <button onClick={()=>dispatch(setShowSidebar(true ))} className="md:hidden" > 
                <RxHamburgerMenu size={24} />
            </button>

            
            <p className="text-gray-500 hidden md:block" >{convertMiladi2Jalali()}</p>
            <span className="flex items-center gap-4" >
                <span className="relative" >
                <BellIcon className="text-gray-500" /> 
                <CircleDotIcon className="absolute top-0 right-0 text-red-500 animate-ping" size={10} />
                </span>
                <span className="flex justify-center items-center size-10 ring-1 rounded-full " >
                    <User2Icon className="text-sky-500" />
                </span>
                <p  className="text-gray-500">نام کاربر</p>
            </span>
        </div>
           
        </section>
    );
}

export default Header;
