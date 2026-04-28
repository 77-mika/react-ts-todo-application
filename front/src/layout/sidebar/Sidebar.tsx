import { GoHome } from "react-icons/go";
import SidebarElements from "./SidebarElements";
import TopActionElement from "./TopActionElement";
import { TbSubtask } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import SidebarContainer from "../../components/containers/SidebarContainer";

function Sidebar() {
    return (
        <SidebarContainer>
            <div className="h-full w-full">
                <TopActionElement />
                <hr className="my-5 border-b dark:border-b-gray-500  " />
                <ul className="space-y-4 ">
                    <SidebarElements to={"/"} title="داشبورد" Icon={GoHome} />
                    <SidebarElements
                        to={"/categories"}
                        title="دستبه بندی ها"
                        Icon={TbSubtask}
                    />
                    <SidebarElements
                        to={"/tasks"}
                        title="تسک ها"
                        Icon={FaTasks}
                    />
                </ul>
            </div>
        </SidebarContainer>
    );
}

export default Sidebar;
