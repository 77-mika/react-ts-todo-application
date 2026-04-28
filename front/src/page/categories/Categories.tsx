import { useEffect, useState } from "react";
import { addTaskCategoryService, getTaskCategories } from "../../services/taskCategory";
import type { categoriesItemListType } from "../../types/taskCategory";
import { convertMiladi2Jalali } from "../../utils/dateUtils";
import {

    BsPencil,

    BsTrash3,
} from "react-icons/bs";
import { successToast } from "../../utils/toastUtils";
import SimpleDialog from "../../components/ui/SimpleDialoge";

const Categories = () => {
    const [categories, setCategories] = useState<categoriesItemListType[]>([]);
    const [isOpen,setIsOpen] = useState<boolean>(false)
    const handleGetTaskCategories = async () => {
        const data = await getTaskCategories();
        if (data){
            
            setCategories(data)
            successToast()
        };
    };
    const handleAddTaskCategory = async () =>{
        const res = await addTaskCategoryService();
        if(res) {
            console.log(res.data)
            setCategories([...categories,res.data]);
            successToast()
        }
    }

    useEffect(() => {
        handleGetTaskCategories();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center ">
                <h1 className="py-5 text-lg font-bold">لیست دسته بندی وظایف</h1>
                <button onClick={()=>setIsOpen(true)} className="text-white bg-sky-500 rounded-lg px-3 py-1 cursor-pointer hover:bg-sky-300 transition-all ease-in-out  ">
                    افزودن دسته بندی
                </button>
                <SimpleDialog isOpen={isOpen} onClose={()=>setIsOpen(false)}>
                    <div className=""></div>
                </SimpleDialog>
            </div>
            <table className="table w-full rounded-lg overflow-hidden shadow-sm bg-white dark:*:bg-gray-600 dark:shadow-gray-500">
                <thead>
                    <tr className="border-b dark:border-b-gray-500 h-12 [&>th]:px-2 [&>th]:md:px-3 [&>th]:text-center ">
                        <th className=" hidden md:table-cell">#</th>
                        <th>عنوان</th>
                        <th className="hidden md:table-cell" >توضیحات</th>
                        <th>تاریخ ایجاد</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody className="md:text-3 text-gray-800 dark:text-gray-400  ">
                    {categories.map((item) => (
                        <tr
                            key={item.id}
                            className="h-9 border-b  dark:border-b-gray-500 border-dashed dark:border-gray-500 [&>th]:text-center [&>td]:px-2 [&>td]:md:px-3 last:border-b-0"
                        >
                            <td className="hidden md:table-cell">{item.id}</td>
                            <td>{item.title}</td>
                            <td className="hidden md:table-cell" >{item.description}</td>
                            <td>{convertMiladi2Jalali(item.createdAt)}</td>
                            <td>
                                <span className="h-full flex justify-center itemce gap-2">
                                    <BsTrash3 className="text-red-400 cursor-pointer " />
                                    <BsPencil className="text-gray-600 dark:text-gray-300 cursor-pointer " />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Categories;
