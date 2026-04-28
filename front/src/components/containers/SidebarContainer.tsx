import type { ReactNode } from "react";
import { useAppSelector } from "../../redux/ReduxHooks";

const SidebarContainer = ({children}:{children:ReactNode}) => {
        const { showSidebar } = useAppSelector((state) => state.UiManagerReducer);
    return (
        <section
            id="sidebar"
            className={`fixed md:right-0 top-0 w-app-sidebar-w h-screen bg-white dark:bg-gray-700  md:block ${showSidebar ? "right-0" : "-right-app-sidebar-w"} transition-all border-l border-gray-500 p-3`}
        >
            {children}
        </section>
    );
};

export default SidebarContainer;
