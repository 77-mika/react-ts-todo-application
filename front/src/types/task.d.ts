export interface addTaskListType {
    title: string;
    description?: string;
    isDone: boolean;
    taskCategoryId: string;
    repetitionType?: number;
    repetitionItems?: number;
    includeVacation?: boolean;
    startedAt: string;
    endedAt?: string;
    createdAt: string;
}

export interface TaskListType extends addTaskListType {
    id: string;
}
