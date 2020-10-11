export const formattedDate =(date: Date): string =>{
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

export const isOverDue = (date: string | null): boolean => { 
    if(!date) return false;
    const dueDate =  new Date(date).setHours(0, 0, 0, 0);
    const todaysDate = new Date().setHours(0, 0, 0, 0);
    return dueDate < todaysDate;
}