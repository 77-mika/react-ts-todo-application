import {toast} from "react-toastify"
import type {TypeOptions,ToastPosition} from "react-toastify"

export const showToast = (
    text: string,
    icon: TypeOptions = "info",
    autoClose?:number|false,
    position:ToastPosition='bottom-left'

) =>{
    return toast(text,{
        closeOnClick:true,
        autoClose,
        type:icon,
        rtl:true,
        position:position,
        theme: localStorage.getItem('theme') || "dark"
    });
};

export const errorToast = (text = "عملیات ناموفق") =>{
    return showToast(text,"error")
}

export const successToast = (text = "عملیات موفق") =>{
    return showToast(text,"success")
}