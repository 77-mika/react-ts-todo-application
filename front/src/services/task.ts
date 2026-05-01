import type { addTaskListType } from "@/types/task";
import httpService from "./_httpServices";

export const editTaskServices = (
    taskId : string,
    values : Partial<addTaskListType>
) => {
    return httpService(`/tasks/${taskId}`,"PATCH",values)
};

export const addTaskService = (values: addTaskListType)=>{
    return httpService(`/tasks`,"POST",values)
};

export const deleteTaskService = (taskId:string) => {
    return httpService(`/tasks/${taskId}`,"DELETE");
};

export const getTaskWithDate = (data:string) => {
    return httpService(`/tasks?startedAt_like=${data}`,"GET")
}