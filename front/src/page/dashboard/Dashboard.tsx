import { getTaskWithDate } from "@/services/task";
import type { TaskListType } from "@/types/task";
import { useEffect, useState } from "react";
import AppButton from "@/components/shared/AppButton"
import AddTaskModal from "./_partial/AddTaskModal";

const Dashboard = () => {
    const [todayTask,setTodayTask] = useState<TaskListType[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleGetTodayTask = async () => {
        const today =new Date().toISOString().split('T')[0];
        console.log(today);

        const res = await getTaskWithDate(today);
        console.log(res);
        if(res.status === 200) {
            setTodayTask(res.data);
        }
    }


    useEffect(()=>{
        handleGetTodayTask()
    },[]);
        
   
    return (
        <div className="w-full h-full justify-center flex items-baseline">
            <div className="w-full max-w-96 h-full flex flex-col gap-10 ">
                 {todayTask?.length ? (
                    <>
                    <ul className="space-y-3 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg" >
                        {todayTask?.map((task)=>(
                            <li key={task.id} className="w-full rounded-sm border-gray-400 border py-2 px-3 hover:shadow-md cursor-pointer transition-all">
                                {task.title}
                            </li>
                        )) }
                    </ul>
                            <AddTaskModal
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            setTasks={setTodayTask}
                        />
                    </>
                 ):(<>
                    <h1 className="text-center w-full" >امروز تسکی نداری...😴</h1>
                        <AddTaskModal
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            setTasks={setTodayTask}
                        />
                    </>
                 )}
            </div>
        </div>
    );
}

export default Dashboard;
