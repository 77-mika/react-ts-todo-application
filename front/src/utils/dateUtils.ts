import moment from "jalali-moment"
moment.locale("fa-IR")


export type FormatType = `dddd, jD jMMMM jYYYY` | 'jD jMMM jYYYY' | `jMM/jDD` | `jYYYY/jMM/jDD`

export const convertMiladi2Jalali = (date?: string | undefined, format:FormatType = `jD jMMM jYYYY`)=>{
    const newDate = moment(date)
    return newDate.format(format)
}


export const getDatesInRange = (startOffSet:number,endOffSet:number):string[]=>{
    const today = new Date();
    const dates:string[]=[];


    startOffSet = -startOffSet

    for (let i = startOffSet;i<= endOffSet;i++){
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate()+i);
        dates.push(currentDate.toISOString())
    }

    return dates
}






export const compareDates = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getUTCFullYear() === d2.getUTCFullYear() &&
    d1.getUTCMonth() === d2.getUTCMonth() &&
    d1.getUTCDate() === d2.getUTCDate()
  );
};