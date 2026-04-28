
import httpService from "./_httpServices";

export const getTaskCategories = async () => {
    const response = await httpService('/taskCategories',"GET");
    if (response.status == 200)return response.data;
    return null
};



export const addTaskCategoryService = () => {
    return httpService('/taskCategories',"POST",
        {
            "title":"دسته تست 2",
            "description": "توضیحات تست 2",
            "icon": "work_icon",
            "userId": "1",
            "createdAt": "2024-01-01T00:00:00.000Z"
        }
    );
};

