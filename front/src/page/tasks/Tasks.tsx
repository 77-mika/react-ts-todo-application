import { addTaskService, deleteTaskService, editTaskServices } from "@/services/task";
import { getTaskCategoriesWithTaskService } from "@/services/taskCategory";
import type { TaskListType } from "@/types/task";
import type { categoriesWithItemListType } from "@/types/taskCategory";
import { confirmAlert } from "@/utils/alertUtils";
import { compareDates, convertMiladi2Jalali,getDatesInRange } from "@/utils/dateUtils";
import { successToast } from "@/utils/toastUtils";
import { useEffect, useState } from "react";

const Tasks = () => {
    const [dates,setDates] = useState<{gregorian:string;jalali:string}[]>([]);
    const [taskCats,setTaskCats] = useState<categoriesWithItemListType[]>([]);
    const [input,setInput] = useState<string>("");


    const generateDatesInRange = ()=>{
        const resDate = getDatesInRange(3,5);
        const resJalaliDates = resDate.map((date)=>({
            gregorian:date,
            jalali : convertMiladi2Jalali(date)
            }));
        setDates(resJalaliDates);
    };


    const handleGetTasks = async () => {
    try {
        const res = await getTaskCategoriesWithTaskService();
        if (res.status === 200) {
            setTaskCats(res.data);
        }
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        // Optionally set an error state here
    }
    };

    const handleChangeIsDone = async (task:TaskListType) =>{
        console.log('Task:', task); // Check what task object contains
        console.log('Task ID:', task.id, typeof task.id); // Check ID type
        const res = await editTaskServices(task.id,{isDone:!task.isDone})
        if (res.status === 200){
            successToast()
            handleGetTasks()
        }
    };

    const handleClickCell = async (date:string,category:categoriesWithItemListType)=>{
        if(!input.trim()) return null
        const res = await addTaskService({
            title:input,
            startedAt:date,
            taskCategoryId:category.id,
            isDone:false,
            createdAt:new Date().toISOString()
        })
        if (res.status === 201) {
            successToast()
            handleGetTasks()
            setInput("")
        }
    };

    const handleDeleteTask = async (e:React.MouseEvent<HTMLSpanElement, MouseEvent>,task:TaskListType)=>{
        e.preventDefault ()
        const confirm = await confirmAlert(task.title,"آیا از حذف این مورد اطمینان دارید")
        if (!confirm.isConfirmed) return null
        const res = await deleteTaskService(task.id)
        if (res.status === 200) {
            successToast("با موفقیت حذف شد")
            handleGetTasks()
        }

    }

    useEffect(()=>{
        generateDatesInRange();
    },[]);

    useEffect(()=>{
        if(dates.length) handleGetTasks();
    },[dates])

    return (
        <div>
            <h1 className="py-5 text-lg font-bold" >لیست تسک ها</h1>
            <div className="felx gap-4 items-center pb-4">
                <input
                type="text" 
                placeholder="عنوان تسک" 
                className="h-10 rounded-md w-full md:w-60 px-2 bg-white border-2 border-blue-300 focus:border-blue-600 focus:ring-blue-600 outline-0 "
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                />
            </div>
            <table className="table w-full rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-600 dark:shadow-gray-500" >
                <thead>
                    <tr className="border-b dark:border-b-gray-500 h-12 [&>th]:md:px-3 [&>th]:text-center">
                        <th >تاریخ</th>
                        {taskCats.map((tc)=>(
                        <th key={tc.id}>{tc.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="md:text-3 text-gray-800 dark:text-gray-400" >
                    {dates.map((date)=>(
                        <tr
                        key={date.gregorian} 
                        className="h-9 border-b box-border  border-dashed dark:border-b-gray-500 shadow-gray-500 [&>td]:md:px-3 [&>td]:text-center last:border-b-0 "
                        >
                            <td >{date.jalali}</td>
                            {taskCats.map((tc)=>(
                                <td key={tc.id} 
                                className={`text-center gap-2 space-x-1 box-border transition-all ${input.trim() && "hover:ring cursor-pointer" } `} 
                                onClick={()=>handleClickCell(date.gregorian,tc)} >
                                    {tc.tasks.map(task => {
                                        const shouldShow = compareDates(task.startedAt, date.gregorian);
                                        if (!shouldShow) return null; // Don't render anything
                                        
                                        return (
                                            <span 
                                                onClick={() => handleChangeIsDone(task)}
                                                onContextMenu={(e)=>handleDeleteTask(e,task)}
                                                className={`${task.isDone ? "bg-green-400" : "bg-blue-400"} rounded-sm text-white cursor-pointer`}
                                                key={task.id}
                                            >
                                                {task.title}
                                            </span>
                                        );
                                    })}
                                </td>
                            ))}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tasks;
