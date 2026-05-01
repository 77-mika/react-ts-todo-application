
import Swal from "sweetalert2";
import type {SweetAlertIcon} from "sweetalert2";

export const successAlertModal = (text:string='',title:string='عملیات موفق' , icon:SweetAlertIcon="success")=>{
    return Swal.fire({
        icon,
        text,
        title,
        showConfirmButton:true,
        backdrop:true
    });
};

export const errorAlertModal = (text:string='',title:string='عملیات موفق' , icon:SweetAlertIcon="error")=>{
    return Swal.fire({
        icon,
        text,
        title,
        showConfirmButton:true,
        backdrop:true
    });
};

export const confirmAlert = (
    title = "آیا مطمعن هستید؟",
    text = "",
    icon:SweetAlertIcon = "warning",
    confirmButtonColor = "#ff5555",
    confirmButtonText = "تایید"

 ) => {
    return Swal.fire({
        icon,
        title,
        text,
        showConfirmButton:true,
        confirmButtonText,
        showCancelButton:true,
        cancelButtonText:'انصراف',
        confirmButtonColor,
        cancelButtonColor:"grey"
    })
}