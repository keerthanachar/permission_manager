export function isSameDay(date1: any, date2: any) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}
export function isSameWeek(date1: any, date2: any) {
    const firstDayOfWeek = new Date(date1);
    const lastDayOfWeek = new Date(date1);
    lastDayOfWeek.setDate(date1.getDate() + 6 - date1.getDay());

    return date2 >= firstDayOfWeek && date2 <= lastDayOfWeek;
}
