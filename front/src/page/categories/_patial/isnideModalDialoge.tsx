import AppButton from "@/components/shared/AppButton";
import AppInput from "@/components/shared/AppInput";
import { addTaskCategoryService } from "@/services/taskCategory";
import type {
    addCategoryType,
    categoriesItemListType,
} from "@/types/taskCategory";
import { successToast } from "@/utils/toastUtils";
import { useState } from "react";

const IsnideModalDialoge = ({
    setCategories,
    onClose,

}: {
    setCategories: (data: categoriesItemListType) => void;
    onClose:()=>void;
}) => {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [value, setValue] = useState<addCategoryType>({
        title: "",
        description: "",
        createdAt: new Date().toISOString(),
        userId: "1",
        icon: "test_icon",
    });

    const handleAddTaskCategory = async (
        e: React.SubmitEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        setIsLoading(true)
        const res = await addTaskCategoryService(value);
        if (res.status === 201) {
            setCategories(res.data);
            successToast();
            setIsLoading(false)
            onClose()
        }
    };

    return (
        <form action="" onSubmit={handleAddTaskCategory}>
            <div className="flex flex-col gap-6 ">
                <span className=" flex h-12 items-center justify-center w-full text-center dark:text-white ">
                    افزودن کار جدید
                </span>

                <AppInput
                    id="title"
                    title="عنوان"
                    required
                    value={value.title}
                    onChange={(e) =>
                        setValue({ ...value, title: e.target.value })
                    }
                />
                <AppInput
                    id="description"
                    title="توضیحات"
                    required
                    value={value.description}
                    onChange={(e) =>
                        setValue({ ...value, description: e.target.value })
                    }
                />
                <AppButton type="submit" isLoading={isLoading}/>
            </div>
        </form>
    );
};

export default IsnideModalDialoge;
