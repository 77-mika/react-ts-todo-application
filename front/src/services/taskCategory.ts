import type { addCategoryType } from "@/types/taskCategory";
import httpService from "./_httpServices";

export const getTaskCategories = async () => {
    const response = await httpService("/taskCategories", "GET");
    if (response.status == 200) return response.data;
    return null;
};

export const addTaskCategoryService = (value: addCategoryType) => {
    return httpService("/taskCategories", "POST", value);
};
