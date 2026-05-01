import AppButton from "@/components/shared/AppButton";
import AppInput from "@/components/shared/AppInput";
import ModalSelect from "@/components/shared/SelectApp";
import SimpleDialog from "@/components/ui/SimpleDialoge";
import { addTaskService } from "@/services/task";
import { getTaskCategories } from "@/services/taskCategory";
import type { categoriesItemListType } from "@/types/taskCategory";
import type { TaskListType } from "@/types/task";
import { successToast } from "@/utils/toastUtils";
import React, { useEffect, useState } from "react";

type AddTaskModalType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setTasks: React.Dispatch<React.SetStateAction<TaskListType[]>>;
};

const AddTaskModal = ({ isOpen, setIsOpen, setTasks }: AddTaskModalType) => {
  const [taskCats, setTaskCats] = useState<categoriesItemListType[]>();
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleGetTaskCategories = async () => {
      try {
        const data = await getTaskCategories();
        console.log("Fetched data:", data);
        setTaskCats(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    handleGetTaskCategories();
  }, []);

  const handleAddTodayTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim() || !select) return;
    const date = new Date().toISOString();
    setIsLoading(true);
    const res = await addTaskService({
      title: input,
      createdAt: date,
      startedAt: date,
      isDone: false,
      taskCategoryId: select,
    });

    if (res.status === 201) {
      successToast();
      setTasks((prev: TaskListType[]) => [...prev, res.data] as TaskListType[]);
      setIsOpen(false);
      setInput("");
      setSelect("");
      setIsLoading(false);
    }
  };


  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-2 text-sm md:text-md text-white bg-indigo-500 rounded-lg cursor-pointer duration-200 hover:bg-indigo-600 hover:scale-101 "
      >
        افزودن تسک
      </button>

      <SimpleDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title=""
      >
        <form
          className="flex w-full flex-col gap-10   "
          onSubmit={handleAddTodayTask}
        >
          <ModalSelect
            categories={taskCats}
            title="دسته بندی تسک"
            onChange={(e) => setSelect(e.target.value)}
            value={select}
          />
          <AppInput
            title="نام تسک"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <AppButton type="submit" isLoading={isLoading} />
        </form>
      </SimpleDialog>
    </>
  );
};

export default AddTaskModal;