import type { TaskListType } from "./task";

export type addCategoryType = {
"title":string,
"description":string,
"userId":string,
"createdAt":stringو
"icon":string
}

export type categoriesItemListType = addCategoryType & {
"id": string,
};

export interface categoriesWithItemListType extends categoriesItemListType {
    tasks:TaskListType[]
};

