import moment from "jalali-moment"
moment.locale("fa-IR")


export type FormatType = `dddd, jD jMMMM jYYYY` | 'jD jMMM jYYYY' | `jMM/jDD` | `jYYYY/jMM/jDD`

export const convertMiladi2Jalali = (date?: string | undefined, format:FormatType = `jD jMMM jYYYY`)=>{
    const newDate = moment(date)
    return newDate.format(format)
}