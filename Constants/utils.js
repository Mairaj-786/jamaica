export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const MOCKEVENTS = [
    {
        date: new Date(2023, 1, 10), title: 'Lets Lyme', lastName: 'ali',
    },
    {
        date: new Date(2023, 1, 13), title: 'Lets Lyme', lastName: 'ali',
    },
    {
        date: new Date(2023, 1, 21), title: 'Lets Lyme', lastName: 'ali',
    },
]



export const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
}

export const getSortedDays = (month, year) => {
    const dayIndex = new Date(year, month, 1).getDay()
    return [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)];

}

export const getDateObj = (day, month, year) => {

    return new Date(year, month, day);
}

export const areDatesTheSame = (first, second) => {
    return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()

    )
}

