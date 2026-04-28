import { RxHamburgerMenu } from "react-icons/rx";
import { useAppDispatch } from "../../redux/ReduxHooks";
import { setShowSidebar } from "../../redux/ui-management/UiManagement";

function Header() {
    const dispatch = useAppDispatch()
    return (
        <section
            id="header"
            className="fixed top-0 left-0 h-app-header-h w-full bg-white dark:bg-gray-700 md:pr-app-sidebar-w shadow-lg p-2"
        >
        
        <div className="flex items-center h-full">
                <button onClick={()=>dispatch(setShowSidebar(true ))} className="md:hidden" > 
                <RxHamburgerMenu size={24} />
            </button>
        </div>
           
        </section>
    );
}

export default Header;
