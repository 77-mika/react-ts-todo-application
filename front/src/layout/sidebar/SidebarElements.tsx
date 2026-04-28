
import type { IconType } from "react-icons";
import { NavLink, type To } from "react-router";

type SidebarElementsType = {
    title: string;
    Icon: IconType;
    to : To
};

const SidebarElements = ({ Icon, title,to }: SidebarElementsType) => {
    return (
        <li>
            <NavLink to={to} className={({isActive})=>`flex items-center gap-3 p-1 rounded-md transition-all ${isActive && "bg-sky-500 text-white raisuce rounded-md " } `} >
                <Icon size={24}/>
                {title}
            </NavLink>
        </li>
    );
};
export default SidebarElements;
